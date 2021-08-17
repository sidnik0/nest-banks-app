export const help = `Options:
  help                                      display help for command

Commands:
  create-user [options]                     Create a user in the app
  get-users                                 Get all users
  get-user [options]                        Get user
  update-user [options]                     Update user
  delete-user [options]                     Delete user
  create-bank [options]                     Create a bank in the app
  get-banks                                 Get all banks
  get-bank [options]                        Get bank
  update-bank [options]                     Update bank
  delete-bank [options]                     Delete bank
  bank-registration-with-account [options]  Registration user in the bank
  create-account [options]                  Create a bank account
  get-account [options]                     Get account
  get-all-accounts-user [options]           Get all accounts user
  get-all-user-banks [options]              Get all banks the user exists
  get-all-bank-users [options]              Get all bank users
  create-transaction [options]              Create transaction
  get-all-transactions-account [options]    Get all transactions account
`;

export const createUserHelp = `Create a user in the app

Options:
  name=<name>      User name
  face=<face>      User face ("entity" || "individual")
  help             display help for command
`;

export const getUsersHelp = `Get all users

Options:
  help             display help for command
`;

export const getUserHelp = `Get user

Options:
  id=<id>          User id
  help             display help for command
`;

export const updateUserHelp = `Update user

Options:
  id=<id>          User id
  name=<name>      User name
  face=<face>      User face ("entity" || "individual")
  help             display help for command
`;

export const deleteUserHelp = `Delete user

Options:
  id=<id>          User id
  help             display help for command
`;

export const createBankHelp = `Create a bank in the app

Options:
  name <name>      Bank name
  comEnt <comEnt>  Entity commission
  comInd <comInd>  Individuals commission
  help             display help for command
`;

export const getBanksHelp = `Get all banks

Options:
  help             display help for command
`;

export const getBankHelp = `Get bank

Options:
  id=<id>          Bank id
  help             display help for command
`;

export const updateBankHelp = `Update bank

Options:
  id=<id>          Bank id
  name=<name>      Bank name
  comEnt=<comEnt>  Entity commission
  comInd=<comInd>  Individuals commission
  help             display help for command
`;

export const deleteBankHelp = `Delete bank

Options:
  id=<id>          Bank id
  help             display help for command
`;

export const bankRegistrationHelp = `Registration user in the bank

Options:
  idUser=<idUser>     User id
  idBank=<idBank>     Bank id
  currency=<currency> currency ("USD" | "EUR" | "RUB")
  balance=<balance>   balance
  help                display help for command
`;

export const createAccountHelp = `Create a bank account

Options:
  idUser=<idUser>     User id
  idBank=<idBank>     Bank id
  currency=<currency> currency ("USD" | "EUR" | "RUB")
  balance=<balance>   balance
  help                display help for command
`;

export const getAccountHelp = `Get account

Options:
  id=<id>          Account id
  help             display help for command
`;

export const getAllAccountHelp = `Get all accounts user

Options:
  id=<id>          User id
  help             display help for command
`;

export const getAllUsersHelp = `Get all bank users

Options:
  id=<id>          Bank id
  help             display help for command
`;

export const getAllBanksHelp = `Get all banks the user exists

Options:
  id=<id>          User id
  help             display help for command
`;

export const createTransactionHelp = `Create transaction

Options:
  fromAccountId=<fromAccountId> From account
  toAccountId=<toAccountId>     To account
  value=<value>                 value
  help                          display help for command
`;

export const getAllTransactionsHelp = `Get all transactions account

Options:
  id=<id>          Account id
  help             display help for command
`;

export const getTransactionHelp = `Get transaction account

Options:
  id=<id>          Transaction id
  help             display help for command
`;
