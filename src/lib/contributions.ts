
interface Contribution {
    date: string
    count: number
}

export async function getContributions(provider: 'github'|'gitlab', username: string): Promise<Contribution[]> {
    if (provider === 'gitlab') {
        return await getGitlabContributions(username);
    } else if (provider === 'github') {
        return await getGithubContributions(username);
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
    return [
        {
            date: '2024-03-09',
            count: 3,
        },
    ];
}
