export type AssetWalletType = "stockBr" | "stock" | "fii" | "etf" | "reit";

export interface AssetWallet {
    id: string;
    ticker: string;
    longName: string;
    displayName: string;
    rentabilityPercent: number;
    rentability: number;
    amount: number;
    avaragePrice: number;
    marketPrice: number;
}

export interface AssetRentability {
    id: string;
    ticker: string
    amount: number;
    averagePrice: number;
    rentability: number;
    active: boolean;
}