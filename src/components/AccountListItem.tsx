import { Account } from '@/models/Account';
import { Flex } from '@mantine/core';

export interface AccountListItemProps {
  account: Account;
}

export const AccountListItem: React.FC<AccountListItemProps> = ({ account }) => {
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
      <p style={{ fontWeight: 'bold' }}>{account.username}</p>
    </Flex>
  );
};
