import prisma from "../context/prisma";
import { AssetWalletType } from "../types/asset";
import { Transaction } from "../types/transaction";

export async function getAssetsTransactions(type: AssetWalletType) {
    //if (!type) return;

    const transactions = await prisma.transaction.findMany();

    const transactionsByTicker = transactions
        .reduce((dic, transaction) => {
            const { ticker } = transaction;
            dic[ticker] = dic[ticker] || [];
            dic[ticker] = [...dic[ticker], transaction]

            return dic;
        }, []);

    const withBalance = 
        transactionsByTicker.forEach(ticker => {
          const transactions: Transaction[] = transactionsByTicker[ticker];

          const sumOfAmounts = transactions.reduce((sums, transaction) => {
            const { type, amount } = transaction;
            sums[type] += amount;
            return sums;
          }, { "Buy": 0, "Sell": 0 });

          const active = sumOfAmounts.Buy > sumOfAmounts.Sell ? true : false;

          return ticker;
    });
    
        const assetsWithBalance = transactionsByTicker.

    return transactionsByTicker;
}