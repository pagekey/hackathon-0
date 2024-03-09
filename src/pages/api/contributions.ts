// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getContributions } from "@/lib/contributions";
import { Account } from "@/models/Account";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Account[]>,
) {
    const accounts: Account[] = req.body;
    if (!Array.isArray(accounts) || accounts.some(account => typeof account.provider !== "string" || typeof account.username !== "string")) {
        res.status(400).json({ error: "Invalid request" });
        return;
    }

    const contributionsPromises = accounts.map(async (account) => {
        const contributions = await getContributions(account);
        return contributions;
    });

    const contributionsList = await Promise.all(contributionsPromises);
    res.status(200).json(contributionsList);
}
