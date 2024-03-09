
interface Account {
    provider: 'github'|'gitlab'
    username: string
}

interface Contribution {
    date: string
    count: number
}

export async function getContributions(account: Account): Promise<Contribution[]> {
    if (account.provider === 'gitlab') {
        return await getGitlabContributions(account.username);
    } else if (account.provider === 'github') {
        return await getGithubContributions(account.username);
    } else {
        return [];
    }
}

async function getGithubContributions(username: string): Promise<Contribution[]> {
    return [
        {
            date: '2024-03-09',
            count: 3,
        },
    ];
}

async function getGitlabContributions(username: string): Promise<Contribution[]> {
    try {
        const response = await fetch(`https://gitlab.com/users/${username}/calendar.json`);
        const data = await response.json();
        return data.map(({ date, additions }) => ({ date, count: additions }))
    } catch(error) {
        console.error(error);
        return [];
    }
}
