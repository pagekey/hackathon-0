import { Account } from '@/models/Account';
import { Stack } from '@mantine/core';
import { AccountListItem } from './AccountListItem';

export interface AccountListProps {
  accounts: Account[];
}

export const AccountList: React.FC<AccountListProps> = ({ accounts }) => {
  return (
    <Stack>
      {accounts.map((account: Account) => (
        <AccountListItem key={account.provider + account.username} account={account} />
      ))}
    </Stack>
  );
};
