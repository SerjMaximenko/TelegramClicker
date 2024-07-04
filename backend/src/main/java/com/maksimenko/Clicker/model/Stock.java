package com.maksimenko.Clicker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Stock {
    private String symbol;
    private Double cost;
    private Double actualStockCost;
    private Double costChange;
    private Double dividends;
    private Integer quantity;

    @JsonIgnore
    private Double averageBuyStock = 0d;

    @JsonIgnore
    private StockCostGenerator stockCostGenerator;

    public Stock() {
    }

    public Stock(String symbol, Double cost, Double costChange, Double dividends, Integer quantity) {
        this.symbol = symbol;
        this.cost = cost;
        this.costChange = costChange;
        this.dividends = dividends;
        this.quantity = quantity;
        stockCostGenerator = new StockCostGenerator();
    }

    public Double getActualStockCost() {
        return actualStockCost;
    }

    public void setActualStockCost(Double actualStockCost) {
        this.actualStockCost = actualStockCost;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getDividends() {
        return dividends;
    }

    public void setDividends(Double dividends) {
        this.dividends = dividends;
    }

    public Double getCostChange() {
        return costChange;
    }

    public void setCostChange(Double costChange) {
        this.costChange = costChange;
    }

    public Double getAverageBuyStock() {
        return averageBuyStock;
    }

    public void setAverageBuyStock(Double averageBuyStock) {
        this.averageBuyStock = averageBuyStock;
    }

    public void setStockCostGenerator(StockCostGenerator stockCostGenerator) {
        this.stockCostGenerator = stockCostGenerator;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public StockCostGenerator getStockCostGenerator() {
        return stockCostGenerator;
    }

    @Override
    public String toString() {
        return "Stock{" +
                "symbol='" + symbol + '\'' +
                ", cost=" + cost +
                ", buyCost=" + costChange +
                '}';
    }
}
