
interface Contribution {
    date: string
    count: number
}

export function getContributions(provider: 'github'|'gitlab', username: string): Contribution[] {
    return [
        {
            date: '2024-03-09',
            count: 3,
        },
    ];
}
