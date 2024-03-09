interface Contribution {
  date: string;
  count: number;
}

export async function getContributions(
  provider: 'github' | 'gitlab',
  username: string,
): Promise<Contribution[]> {
  return [
    {
      date: '2024-03-09',
      count: 3,
    },
  ];
}
