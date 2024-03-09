import { Inter } from 'next/font/google';
import { Select, Button, TextInput, Container } from '@mantine/core';
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [username, setUsername] = useState<string>('');
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [accounts, setAccounts] = useState([]);

  const handleAccountAdd = () => {
    if (username && selectedAccount) {
      setAccounts([...accounts, { username, account: selectedAccount }]);
    }
  };

  return (
    <Container>
      <TextInput
        onChange={(e) => setUsername(e.target.value)}
        label='Username'
        title='Enter your Git account username'
      />
      <Select
        label='Account Type'
        onChange={(value: string | null) => setSelectedAccount(value || '')}
        data={['GitHub', 'GitLab']}
      />
      <Button onClick={() => setAccounts({})} disabled={!username || !selectedAccount}>
        Add Account
      </Button>
    </Container>
  );
}
