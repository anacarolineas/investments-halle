import { Decimal } from "@prisma/client/runtime/library";

export interface Transaction {
    id: string;         
    ticker: string;        
    institution: string 
    type: TransactionType
    amount: number;
    unitPrice: Decimal;
    operationValue: Decimal;
    date: Date;
}

export type TransactionType = 'Buy' | 'Sell';
