import accountModel from '../models/account.js';
import HTTPError from '../errors/HTTPError.js';

const WITHDRAW_TAX = 1;
const TRANSFER_TAX = 8;

const getBalance = async (branchNumber, accountNumber) => {
  const account = await getAccount(branchNumber, accountNumber);
  return { balance: account.balance };
}

const credit = async (branchNumber, accountNumber, value) => {
  const account = await getAccount(branchNumber, accountNumber);
  const newBalance = account.balance + value;
  return { balance: await setBalance(account._id, newBalance) };
}

const withdraw = async (branchNumber, accountNumber, value) => {
  const account = await getAccount(branchNumber, accountNumber);
  let taxedValue = value + WITHDRAW_TAX;
  return await debit(branchNumber, accountNumber, taxedValue);
}

const debit = async (branchNumber, accountNumber, value) => {
  const account = await getAccount(branchNumber, accountNumber);
  const newBalance = account.balance - value;
  return { balance: await setBalance(account._id, newBalance) };
}

const transfer = async (origin, destination, value) => {
  let taxedValue = value;

  if (origin.agencia !== destination.agencia) {
    taxedValue += TRANSFER_TAX;
  }

  const balance = await debit(origin.agencia, origin.conta, taxedValue);
  await credit(destination.agencia, destination.conta, value);

  return { balance: balance }
}

const getAccount = async (branchNumber, accountNumber) => {
  try {
    const account = await accountModel.findOne(
      {
        agencia: branchNumber,
        conta: accountNumber
      }
    );

    if (!account) {
      throw new HTTPError(404, 'Could not find account');
    }

    return account;
  }
  catch (err) {
    if (err.statusCode === 404) {
      throw err;
    }
    else {
      throw new HTTPError(500, err.message);
    }
  }
}

const setBalance = async (id, value) => {
  try {
    const account = await accountModel.findByIdAndUpdate(
      id,
      {
        $set: {
          balance: value
        }
      },
      {
        new: true,
        runValidators: true
      }
    );
    return account.balance;
  }
  catch (err) {
    throw new HTTPError(422, err.message);
  }
}

export { getBalance, credit, withdraw, transfer };