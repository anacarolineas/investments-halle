import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { AssetWallet } from "../../../../lib/types/asset";
import prisma from "../../../../lib/context/prisma";
import { getQuotesWallet } from "../../../../lib/yahooFinance/yahooFinance";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method !== "GET") response.status(405).json({ error: "Method not allowed" });

    const assets = await prisma.rentabilityAsset.findMany({
        where: {
            active: true
        }
    });

    const tickers = assets.map(x => `${x.ticker}.SA`);
    const quoteResponse = await getQuotesWallet(tickers);

    const getQuote = (ticker: string): any => {
        const tickerSearch = `${ticker}.SA`;
        return quoteResponse.find(x => x.symbol === tickerSearch);
    }

    const assetsMapped = assets.map(x => {
        const quote = getQuote(x.ticker);
        const rentabilityCurrent = parseFloat((quote.regularMarketPrice * x.amount).toFixed(2));
        const longName = quote.longName;
        const displayName = quote.displayName;
        const regularMarketPrice = quote.regularMarketPrice;

        return {
            id: x.id,
            rentabilityPercent: parseFloat(x.rentability.toFixed(2)),
            rentability: rentabilityCurrent,
            amount: x.amount,
            avaragePrice: parseFloat(x.averagePrice.toFixed(2)),
            ticker: x.ticker,
            longName: longName,
            displayName: displayName,
            marketPrice: regularMarketPrice,           
        } as AssetWallet
    });

    response.status(200).json(assetsMapped);
}