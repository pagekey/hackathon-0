import { Container } from '@mantine/core';
import { useState } from 'react';
import { Account } from '@/models/Account';
import { AddAccount } from '@/components/AddAccount';
import { AccountList } from '@/components/AccountList';
import Calendar from 'react-github-contribution-calendar';
import { Title, Loader, Box, LoadingOverlay } from '@mantine/core';

export default function Home() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [contributions, setContributions] = useState<Record<string, number>>({});
  const [lastDate, setLastDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const loadContributions = async (accounts: Account[]) => {
    setLoading(true);

    try {
      const response = await fetch('/api/contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accounts),
      });

      const data = await response.json();
      setContributions(data);
      setLastDate(Object.keys(data).sort().reverse()[0]);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountAdd = async (newAccount: Account) => {
    const allAccounts = [...accounts, newAccount];
    setAccounts(allAccounts);
    await loadContributions(allAccounts);
  };

  const handleAccountRemoval = async (accountToRemove: Account) => {
    const newAccounts = accounts.filter((account) => account !== accountToRemove);
    setAccounts(newAccounts);

    if (newAccounts.length === 0) {
      setContributions({});
      setLastDate('');
    } else {
      await loadContributions(newAccounts);
    }
  };

  return (
    <Container>
      <Title order={1}>Code Contribution Heatmap</Title>

      <Box pos='relative'>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        <AddAccount onAccountAdd={(account) => handleAccountAdd(account)} />
        <AccountList accounts={accounts} onAccountRemove={handleAccountRemoval} />
      </Box>

      {accounts.length > 0 ? (
        loading ? null : (
          <Calendar values={contributions} until={lastDate} />
        )
      ) : (
        <p>No contributions yet</p>
      )}
    </Container>
  );
}
