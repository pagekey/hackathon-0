import { Account } from '@/models/Account';
import { Stack } from '@mantine/core';
import { AccountListItem } from './AccountListItem';

export interface AccountListProps {
  accounts: Account[];
  onAccountRemove: (account: Account) => any;
}

export const AccountList: React.FC<AccountListProps> = ({ accounts, onAccountRemove }) => {
  return (
    <Stack>
      {accounts.map((account: Account) => (
        <AccountListItem
          key={account.provider + account.username}
          account={account}
          onAccountRemove={() => onAccountRemove(account)}
        />
      ))}
    </Stack>
  );
};
