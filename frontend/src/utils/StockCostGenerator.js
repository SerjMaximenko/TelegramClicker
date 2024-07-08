import { Utils } from './Utils'

export class StockCostGenerator {
    constructor() {
        this.currentLength = 0;
        this.maxLength = 0;
        this.maxRadius = 0;
        this.activeCalculation = false;
        this.value = 0;
        this.positiveRise = true;
    }

    generateCost(actualCost, symbol) {
        if (this.activeCalculation) {
            this.currentLength++;

            let changedValue = this.maxRadius * Math.sin(Math.PI * (this.currentLength / this.maxLength));

            if (this.positiveRise) {
                this.value = actualCost + changedValue;
            } else {
                this.value = actualCost - changedValue;
            }

            if (this.currentLength > this.maxLength) {
                this.activeCalculation = false;
            }
        } else {
            this.currentLength = 0;

            this.positiveRise = !this.positiveRise;

            this.maxRadius = Math.random() * (actualCost * 0.2);
            this.maxLength = Math.random() * 40;

            this.activeCalculation = true;
        }

        return Utils.round2(this.value);
    }
}