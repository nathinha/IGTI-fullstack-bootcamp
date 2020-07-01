import accountModel from '../models/account.js';
import HTTPError from '../errors/HTTPError.js';

const deleteClient = async (branchNumber, accountNumber) => {
  const account = await accountModel.findOneAndDelete(
    {
      agencia: branchNumber,
      conta: accountNumber
    }
  );

  if (!account) {
    throw new HTTPError(404, 'Could not find account');
  }

  return { activeAccounts: await accountModel.countDocuments({ agencia: branchNumber }) };
}

export { deleteClient };