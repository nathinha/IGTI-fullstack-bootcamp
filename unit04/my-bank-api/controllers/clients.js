import accountModel from '../models/account.js';

const PRIVATE_BRANCH = 99;

const getAverageBalance = async (branch) => {
  const res = await accountModel.aggregate([
    {
      $match: {
        agencia: branch
      }
    }, {
      $group: {
        _id: null,
        average: {
          $avg: '$balance'
        }
      }
    }
  ]);

  return res[0];
}

const getLowestBalance = async (qty) => {
  const res = await accountModel.aggregate([
    {
      $sort: { balance: 1 }
    },
    {
      $limit: qty
    }
  ]);

  return res;
}

const getHighestBalance = async (qty) => {
  const res = await accountModel.aggregate([
    {
      $sort: { balance: -1 }
    },
    {
      $limit: qty
    }
  ]);

  return res;
}

const setPrivateBranch = async () => {
  let accounts = await accountModel.aggregate([
    {
      $sort: {
        balance: -1
      }
    }, {
      $group: {
        _id: "$agencia",
        account: {
          $first: "$_id"
        }
      }
    }
  ]);

  for (const account of accounts) {
    const updatedAccount = await accountModel.findByIdAndUpdate(
      account.account,
      {
        $set: {
          agencia: PRIVATE_BRANCH
        }
      },
      {
        runValidators: true
      }
    );

  }

  accounts = accountModel.find({ agencia: PRIVATE_BRANCH }).exec();

  return accounts;
}

export { getAverageBalance, getLowestBalance, getHighestBalance, setPrivateBranch };