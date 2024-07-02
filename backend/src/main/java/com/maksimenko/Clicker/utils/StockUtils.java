package com.maksimenko.Clicker.utils;

import com.maksimenko.Clicker.model.Stock;

public class StockUtils {
    public static Stock generateActualCost(Stock stock){
        stock.setCost(stock.getCost() + (Math.random() * 6));
        return stock;
    }
}
