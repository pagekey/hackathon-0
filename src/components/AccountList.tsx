import { Account } from '@/models/Account';
import { Stack, Flex } from '@mantine/core';

export interface AccountListProps {
  accounts: Account[];
}

export const AccountList: React.FC<AccountListProps> = ({ accounts }) => {
  return (
    <Stack>
      {accounts.map((account: Account) => (
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
  );
};
