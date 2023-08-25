import { NextApiRequest, NextApiResponse } from 'next';
import yahooFinance from 'yahoo-finance2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req;

    const ticker = query.ticker as string;
    console.log(ticker)
    if (!ticker) return res.status(400).json({ error: "Param invalid" });


    const fields = ["symbol", "displayName", "regularMarketPrice", "longName"];

    const result = await yahooFinance.quote(ticker,
        { fields: fields });

    res.status(200).json(result)
}