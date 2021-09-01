export const help = `Options:
  help                                        Display help for command

Commands:
  create-account [options]                    Create account
  create-bank [options]                       Create bank
  create-transaction [options]                Create transaction
  create-user [options]                       Create user
  delete-account [options]                    Delete account by id
  delete-bank [options]                       Delete bank by id
  delete-user [options]                       Delete user by id
  get-account [options]                       Get account by id
  get-accounts [options]                      Get all accounts
  get-all-accounts-by-bank [options]          Get all bank accounts
  get-all-accounts-by-user-and-bank [options] Get all user accounts in the bank
  get-all-accounts-by-user [options]          Get all user accounts
  get-all-transactions-by-account [options]   Get all account transactions
  get-bank [options]                          Get bank by id
  get-banks                                   Get all banks
  get-transaction [options]                   Get transaction by id
  get-transactions                            Get all transactions
  get-user [options]                          Get user by id
  get-users                                   Get all users
  update-account [options]                    Update account by id
  update-bank [options]                       Update bank by id
  update-user [options]                       Update user by id
  exit                                        Close app
`;

export const createAccountHelp = `Create account

Options:
  userId=<userId>                   User id
  bankId=<bankId>                   Bank id
  balance=<balance>                 Starting balance
  currency=<currency>               Currency ("RUB" || "USD" || "EUR")
  
  help                              Display help for command
`;

export const createBankHelp = `Create bank

Options:
  name=<name>                       Bank name
  commissionForEntity=<comEnt>      Entity commission
  commissionForIndividual=<comInd>  Individuals commission
  
  help                              Display help for command
`;

export const createTransactionHelp = `Create transaction

Options:
  fromAccountId=<fromId>            From account
  toAccountId=<toId>                To account
  amount=<value>                    Amount
  
  help                              Display help for command
`;

export const createUserHelp = `Create user

Options:
  name=<name>                       User name
  face=<face>                       User face ("entity" || "individual")
  
  help                              Display help for command
`;

export const deleteAccountHelp = `Delete account by id

Options:
  id=<AccountId>                    Account id
  
  help                              Display help for command
`;

export const deleteBankHelp = `Delete bank by id

Options:
  id=<bankId>                       Bank id
  
  help                              Display help for command
`;

export const deleteUserHelp = `Delete user by id

Options:
  id=<userId>                       User id
  
  help                              Display help for command
`;

export const getAccountHelp = `Get account by id

Options:
  id=<accountId>                    Account id
  
  help                              Display help for command
`;

export const getAccountsHelp = `Get all accounts

Options:
  help                              Display help for command
`;

export const getAllAccountsByBankHelp = `Get all bank accounts

Options:
  id=<bankId>                       Bank id

  help                              Display help for command
`;

export const getAllAccountsByUserAndBankHelp = `Get all user accounts in the bank

Options:
  userId=<userId>                       User id
  bankId=<bankId>                       Bank id

  help                              Display help for command
`;

export const getAllAccountsByUserHelp = `Get all user accounts

Options:
  id=<userId>                       User id

  help                              Display help for command
`;

export const getAllTransactionsByAccountHelp = `Get all account transactions

Options:
  id=<bankId>                       Bank id

  help                              Display help for command
`;

export const getBankHelp = `Get bank by id

Options:
  id=<bankId>                       Bank id
  
  help                              Display help for command
`;

export const getBanksHelp = `Get all banks

Options:
  help                              Display help for command
`;

export const getTransactionHelp = `Get transaction by id

Options:
  id=<transactionId>                Transaction id
  
  help                              Display help for command
`;

export const getTransactionsHelp = `Get all transactions

Options:
  help                              Display help for command
`;

export const getUserHelp = `Get user by id

Options:
  id=<UserId>                       User id
  
  help                              Display help for command
`;

export const getUsersHelp = `Get all users

Options:
  help                              Display help for command
`;

export const updateAccountHelp = `Update account by id

Options:
  id=<accountId>                    Account id
  amount=<amount>                   Amount
  operation=<boolean>               Operation ("replenishment" || "withdrawal")
  
  help                              Display help for command
`;

export const updateBankHelp = `Update bank by id

Options:
  id=<id>                           Bank id
  name=<name>                       Bank name
  commissionForEntity=<comEnt>      Entity commission
  commissionForIndividual=<comInd>  Individuals commission
  
  help                              Display help for command
`;

export const updateUserHelp = `Update user by id

Options:
  id=<id>                           User id
  name=<name>                       User name
  
  help                              Display help for command
`;

export const exitHelp = `Close app

Options:
  help                              Display help for command
`;
