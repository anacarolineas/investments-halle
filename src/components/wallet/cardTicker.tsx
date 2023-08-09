import { styled } from "styled-components";
import stocksBr from '../../mocks/stocks-br.json'
import CustomSpan from "../shared/elements/span";

export default function CardTicker({ticker}: { ticker: CardTickerProps }) {
    const CardTicker = styled.div`
        display: flex;
        margin-bottom: 20px;
        font-size: 14px;
        width: 740px;
    `;

    const CardTickerName = styled.div`
        display: flex;
        flex-direction: column;
        flex: 1 1 40%;
    `;

    const CardTickerPrice = styled.div`
        flex: 1 1 10%;
    `;

    const CardTickerCurrentPrice = styled.div`
        display: flex;
        flex-direction: column;
        flex: 1 1 20%;
        gap: 2px;
    `;

    const CardTickerPosition = styled.div`
        display: flex;
        flex-direction: column;
        flex: 1 1 30%;
    `;  

    const CardTickerCurrentPosition = styled.div`
    
    `;

    const tickerWallet = setDataWallet(ticker);
    calculateProfitability(tickerWallet);

    return (
        <CardTicker>
            <CardTickerName>
                <CustomSpan bold="bold">{tickerWallet.symbol}</CustomSpan>
                <span>{tickerWallet.longName}</span>
            </CardTickerName>
            <CardTickerPrice>
                <span>R${tickerWallet.regularMarketPrice}</span>
            </CardTickerPrice>
            <CardTickerCurrentPrice>
            <CustomSpan
                color={tickerWallet.dailyVariation < 0 ? "red" : "green"}>
                    R${tickerWallet.dailyVariation}
            </CustomSpan>
            <CustomSpan 
                bold="500"
                color={tickerWallet.regularMarketChangePercent < 0 ? "red" : "green"}>
                    {tickerWallet.regularMarketChangePercent}%
                </CustomSpan>
            </CardTickerCurrentPrice>
            <CardTickerCurrentPosition>
                <CustomSpan bold="700">R${tickerWallet.currentPositionValue}</CustomSpan>
                <div>
                    <CustomSpan color="#6B7280">{tickerWallet.amount}</CustomSpan> | <CustomSpan color="#6B7280">R${tickerWallet.averagePrice}</CustomSpan>
                </div>
            </CardTickerCurrentPosition>
        </CardTicker>
    )
}

function setDataWallet(ticker: CardTickerProps): CardTicker {
    const tickerWallet = stocksBr.result.find(t => t.ticker === ticker.symbol);
    if (!tickerWallet) return {} as CardTicker ;

    const tickerCard: CardTicker = {
        ...ticker,
        amount: tickerWallet.number,
        averagePrice: tickerWallet.averagePrice,
        dailyVariation: 0,
        currentPositionValue: 0
    }
    
    return tickerCard;
}

function calculateProfitability(ticker: CardTicker) {
    const variationToday = ticker.regularMarketChangePercent;
    const currentEquity = ticker.amount * ticker.regularMarketPrice;

    ticker.dailyVariation = parseFloat(((currentEquity * variationToday) / 100).toFixed(2));
    ticker.currentPositionValue = parseFloat(currentEquity.toFixed(2));
}

export interface CardTickerProps {
    symbol: string;
    longName: string;
    regularMarketPrice: number;
    regularMarketChangePercent: number;
    exchangeTimezoneShortName: string;
}

interface CardTicker extends CardTickerProps {
    amount: number;
    averagePrice: number;
    dailyVariation: number;
    currentPositionValue: number;
}