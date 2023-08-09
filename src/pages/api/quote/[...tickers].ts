import { NextApiRequest, NextApiResponse } from 'next';
import yahooFinance from 'yahoo-finance2';
import stocksBr from '../../../mocks/stocks-br.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req;

    //verificar get
    const tickers = stocksBr.result
        .map(x => x.ticker);

    const fields = ["symbol", "displayName", "regularMarketPrice", "longName", "regularMarketChangePercent"];

    const results = await yahooFinance.quote(tickers,
        { fields: fields });

     const tickersMapped = results.map((ticker) => {
        return {
            ...ticker,
            regularMarketChangePercent: ticker.regularMarketChangePercent?.toFixed(2)
        }
    })

    res.status(200).json(tickersMapped)
}