import { Account } from '@/models/Account';
import { Contribution } from '@/models/Contribution';
import { parseFromString } from 'dom-parser';

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
    try {
        const response = await fetch(`https://github.com/${username}`);
        if (response.status == 200) {
            // Parse DOM returned in HTML response
            const dom = parseFromString(await response.text());
            const contributions = dom.getElementsByClassName('ContributionCalendar-day');
            const result =  contributions.map(contribution => {
                const date = contribution.getAttribute('data-date');
                const tooltips = dom.getElementsByAttribute('for', contribution.getAttribute('id'));
                if (tooltips[0] && tooltips[0].innerHTML) {
                    const count = parseInt(tooltips[0].innerHTML.split(' ')[0]) || 0;
                    const result: Contribution = { date, count };
                    console.log('got small result',result)
                    return result;
                } else {
                    return { date, count: 0 };
                }
            }).filter(contribution => contribution.count > 0);
            console.log('got big result',result)
            return result;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
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
