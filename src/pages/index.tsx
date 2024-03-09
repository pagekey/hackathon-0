import { Container, Divider } from '@mantine/core';
import { useState } from 'react';
import { Account } from '@/models/Account';
import { AddAccount } from '@/components/AddAccount';
import { AccountList } from '@/components/AccountList';

export default function Home() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  return (
    <Container>
      <AddAccount onAccountAdd={(account) => setAccounts([...accounts, account])} />
      <Divider className='mt-2' />
      <AccountList accounts={accounts} />
    </Container>
  );
}
