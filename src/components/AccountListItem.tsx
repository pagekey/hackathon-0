import { Account } from '@/pages/models/Account';
import { Flex, Button } from '@mantine/core';

export interface AccountListItemProps {
  account: Account;
  onAccountRemove: () => any;
}

export const AccountListItem: React.FC<AccountListItemProps> = ({ account, onAccountRemove }) => {
  return (
    <Flex key={account.username}>
      <div style={{ padding: 20 }}>
        <img
          src={account.provider === 'github' ? `/github.png` : '/gitlab.png'}
          alt={account.username}
          height={32}
          width={32}
        />
      </div>
      <p style={{ fontWeight: 'bold', paddingTop: 6 }}>{account.username}</p>

      <div style={{ marginLeft: 'auto', marginTop: 10 }}>
        <Button onClick={onAccountRemove} variant='outline' color='red' size='xs'>
          Remove
        </Button>
      </div>
    </Flex>
  );
};
