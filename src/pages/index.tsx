import { Select, Button, TextInput, Container, Divider, Stack, Flex } from '@mantine/core';
import { useState } from 'react';
import { Account } from '@/models/Account';

export default function Home() {
  const [username, setUsername] = useState<string>('');
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [accounts, setAccounts] = useState<Account[]>([]);

  const handleAccountAdd = () => {
    if (username && selectedAccount) {
      setAccounts((accounts) => [
        ...accounts,
        { username, provider: selectedAccount.toLowerCase() as any },
      ]);

      setUsername('');
      setSelectedAccount('');
    }
  };

  return (
    <Container>
      <TextInput
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        label='Username'
        title='Enter your Git account username'
      />
      <Select
        label='Account Type'
        onChange={(value: string | null) => setSelectedAccount(value || '')}
        value={selectedAccount}
        data={['GitHub', 'GitLab']}
      />
      <Button onClick={() => handleAccountAdd()} disabled={!username || !selectedAccount}>
        Add Account
      </Button>

      <Divider className='mt-2' />

      <Stack>
        {accounts.map((account) => (
          <Flex key={account.username}>
            <div className='px-2'>
              <img
                src={
                  account.provider === 'github'
                    ? `https://github.com/${account.username}.png`
                    : '/gitlab.png'
                }
                alt={account.username}
                height={32}
                width={32}
              />
            </div>
            <div>{account.username}</div>
            <div>{account.provider}</div>
          </Flex>
        ))}
      </Stack>
    </Container>
  );
}
