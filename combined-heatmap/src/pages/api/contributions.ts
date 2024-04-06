// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getContributions } from "@/lib/contributions";
import { Account } from "@/models/Account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ [date: string]: number }>,
) {
    const accounts: Account[] = req.body;
    if (!Array.isArray(accounts) || accounts.some(account => typeof account.provider !== "string" || typeof account.username !== "string")) {
        res.status(400).json({ error: "Invalid request" });
        return;
    }

    let result: { [date: string]: number } = {};
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        const contributions = await getContributions(account);
        for (let j = 0; j < contributions.length; j++) {
            const contribution = contributions[j];
            result[contribution.date] = (result[contribution.date] || 0) + Number(contribution.count); 
        }
    }
    res.status(200).json(result);
}
