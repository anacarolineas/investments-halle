namespace Indicators {
    export function calculateDailyChange() {

    }

    export function calculateRentability(
        quotas: number, 
        purchasePrice: number, 
        currentPrice: number ):{rentability: number, percent: number} {
        const investmentCost = quotas * purchasePrice;
        const investmentCurrent = quotas * currentPrice;

        const rentability = ((investmentCurrent - investmentCost) / investmentCost) * 100;
        const value = (rentability / 100) * investmentCost;

        return {rentability: parseFloat(value.toFixed(2)), percent: parseFloat(rentability.toFixed(2))};
    }
}

export default Indicators;