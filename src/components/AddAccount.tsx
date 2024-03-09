import { Account } from '@/pages/models/Account';
import { Select, Button, TextInput } from '@mantine/core';
import { useState } from 'react';

export interface AddAccountProps {
  onAccountAdd: (account: Account) => void;
}

export const AddAccount: React.FC<AddAccountProps> = ({ onAccountAdd }) => {
  const [username, setUsername] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  const handleAccountAdd = () => {
    onAccountAdd({ username, provider: selectedAccount.toLowerCase() as any });

    setUsername('');
    setSelectedAccount('');
  };

  return (
    <div>
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
      <Button
        onClick={() => handleAccountAdd()}
        disabled={!username || !selectedAccount}
        style={{ marginTop: 10 }}
      >
        Add Account
      </Button>
    </div>
  );
};
