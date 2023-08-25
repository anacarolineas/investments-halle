import prisma from "../context/prisma";
import { Transaction } from "../types/transaction";

export async function generateRentabilityImport(): Promise<void> {
  const transactions: Transaction[] = await prisma.transaction.findMany();

  const transactionsByTicker: {[key in string]: Transaction[]} = transactions.reduce((dic, transaction) => {
    let { ticker } = transaction;
    if (ticker === "VIVT4") ticker = "VIVT3";
    if (ticker === "VVAR3") ticker = "VIIA3";

    dic[ticker] = dic[ticker] || [];
    dic[ticker] = [...dic[ticker], transaction];

    return dic;
  }, []);

  for (let key in transactionsByTicker) {
    const transactions = transactionsByTicker[key];

    const calcAmountPrice = transactions.reduce(
        (acc, item) => {
          if (item.type === "Buy") {
            acc.sumAmountBuy += item.amount;
            acc.totalPurchases += parseFloat(item.operationValue.toFixed(2));
          } else {
            acc.sumAmountSell += item.amount;
            acc.totalSales += parseFloat(item.operationValue.toString());
          }
          return acc;
        },
        { sumAmountBuy: 0, sumAmountSell: 0, totalPurchases: 0, totalSales: 0 }
      );
    
    const currentQuantity = calcAmountPrice.sumAmountBuy - calcAmountPrice.sumAmountSell;
    const avaragePrice = currentQuantity > 0 ? calcAmountPrice.totalPurchases / calcAmountPrice.sumAmountBuy : calcAmountPrice.totalPurchases / calcAmountPrice.sumAmountBuy;
    const withBalance = currentQuantity > 0;
    const rentabilityAsset = (((calcAmountPrice.totalSales - calcAmountPrice.totalPurchases) / calcAmountPrice.totalPurchases) * 100);
        console.log(calcAmountPrice.totalPurchases)
    if (!withBalance) {
        await prisma.rentabilityAsset.create({
          data: {
              ticker: key,
              amount: currentQuantity,
              averagePrice: Number.isNaN(avaragePrice) ? 0 : avaragePrice,
              active: withBalance,
              rentability: rentabilityAsset == Infinity ? 0 : rentabilityAsset.toFixed(2)
          }
      })
      continue;
    }
    
    const asset = await fetch(`http://localhost:3000/api/asset/${key}.SA`)
        .then(response => response.json())
        .then(data => data);

    const currentQuote = asset.regularMarketPrice.toFixed(2); 
    const rentabilityTotal = ((currentQuote - avaragePrice) / avaragePrice) * 100;
 
    await prisma.rentabilityAsset.create({
        data: {
            ticker: key,
            amount: currentQuantity,
            averagePrice: avaragePrice,
            active: withBalance,
            rentability: rentabilityTotal
        }
    })
  }
}

export async function getAssetsRentability() {
  return await prisma.rentabilityAsset.findMany();
}
