import { Account } from '@/models/Account';
import { Flex } from '@mantine/core';

export interface AccountListItemProps {
  account: Account;
}

export const AccountListItem: React.FC<AccountListItemProps> = ({ account }) => {
  return (
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
  );
};
