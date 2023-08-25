import yahooFinance from "yahoo-finance2";

export async function getQuotesWallet(symbols: string[]) {
    const fields = ["symbol", "displayName", "regularMarketPrice", "longName"];

    return await yahooFinance.quote(symbols,
        { fields: fields });
}