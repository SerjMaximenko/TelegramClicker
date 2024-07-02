package com.maksimenko.Clicker.model;

public class Stock {
    private String symbol;
    private Double cost;
    private Double costChange;
    private Double dividends;
    private Integer quantity;

    public Stock() {
    }

    public Stock(String symbol, Double cost, Double costChange, Double dividends, Integer quantity) {
        this.symbol = symbol;
        this.cost = cost;
        this.costChange = costChange;
        this.dividends = dividends;
        this.quantity = quantity;
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

    @Override
    public String toString() {
        return "Stock{" +
                "symbol='" + symbol + '\'' +
                ", cost=" + cost +
                ", buyCost=" + costChange +
                '}';
    }
}
