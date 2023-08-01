import { NextApiRequest, NextApiResponse } from 'next';
import yahooFinance from 'yahoo-finance2';
import stocksBr from '../../../mocks/stocks-br.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req;

    //verificar get
    const tickers = stocksBr.result
        .map(x => x.ticker);

    const fields = ["symbol", "displayName", "regularMarketPrice"];

    const results = await yahooFinance.quote(tickers,  
        { fields: fields });

    res.status(200).json(results)
}