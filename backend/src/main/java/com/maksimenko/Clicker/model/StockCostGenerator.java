package com.maksimenko.Clicker.model;

import com.maksimenko.Clicker.utils.StockUtils;

public class StockCostGenerator {

    private double currentLength = 0d;
    private double maxLength = 0d;
    private double maxRadius = 0d;
    private boolean activeCalculation = false;
    private double value = 0d;

    private boolean positiveRise = true;

    public double generateCost(double actualCost){
        if (activeCalculation) {
            currentLength++;

            double changedValue = maxRadius * Math.sin(Math.PI * 0.5 * (currentLength / maxLength));

            if (positiveRise) {
                value = actualCost + changedValue;
            } else {
                value = actualCost - changedValue;
            }

            if (currentLength > maxLength) {
                activeCalculation = false;
            }
        } else {
            currentLength = 0d;

            positiveRise = !positiveRise;

            maxRadius = Math.random() * (actualCost * 0.2);
            maxLength = Math.random() * 20;

            activeCalculation = true;
        }

        return StockUtils.round2(value);
    }
}
