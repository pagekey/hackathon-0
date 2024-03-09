import { Account } from '@/models/Account';
import { Contribution } from '@/models/Contribution';

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
        if (response.status == 200) {
            const data: Map<string, string> = await response.json();
            const result = Object.entries(data).map(([date, count]) => ({
                date,
                count,
            }));
            return result;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}
