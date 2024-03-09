import { Container } from '@mantine/core';
import { useState } from 'react';
import { Account } from '@/models/Account';
import { AddAccount } from '@/components/AddAccount';
import { AccountList } from '@/components/AccountList';
import Calendar from 'react-github-contribution-calendar';
import { Title } from '@mantine/core';

export default function Home() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [contributions, setContributions] = useState<Record<string, number>>({});
  const [lastDate, setLastDate] = useState<string>('');

  const handleAccountAdd = async (newAccount: Account) => {
    const allAccounts = [...accounts, newAccount];
    setAccounts(allAccounts);

    const response = await fetch('/api/contributions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(allAccounts),
    });

    const data = await response.json();
    setContributions(data);
    setLastDate(Object.keys(data).sort().reverse()[0]);
  };

  const handleAccountRemoval = (accountToRemove: Account) => {
    setAccounts((accounts) => accounts.filter((account) => account !== accountToRemove));
  };

  return (
    <Container>
      <Title order={1}>Code Contribution Heatmap</Title>
      <AddAccount onAccountAdd={(account) => handleAccountAdd(account)} />
      <AccountList accounts={accounts} onAccountRemove={handleAccountRemoval} />

      {accounts.length > 0 ? (
        <Calendar values={contributions} until={lastDate} />
      ) : (
        <p>No contributions yet</p>
      )}
    </Container>
  );
}
