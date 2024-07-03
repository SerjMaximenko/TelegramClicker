package com.maksimenko.Clicker.service;

import com.maksimenko.Clicker.api.TwelveDataAPI;
import com.maksimenko.Clicker.model.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StockServiceImpl implements StockService {
    private final TwelveDataAPI api;

    @Autowired
    public StockServiceImpl(TwelveDataAPI api) {
        this.api = api;
    }
    @Override
    public List<Stock> readAll() {
        TwelveDataAPI.dataStocks = api.getAllPrices();
        TwelveDataAPI.dataStocks = updateStocksCost(TwelveDataAPI.dataStocks);
        return new ArrayList<>(TwelveDataAPI.dataStocks);
    }

    private List<Stock> updateStocksCost(List<Stock> stocks) {
        return stocks.stream()
                .peek(stock -> stock.setCost(stock.getStockCostGenerator()
                        .generateCost(stock.getActualStockCost())))
                .collect(Collectors.toList());
    }

    @Override
    public Stock updateById(String id, Stock stock) throws Exception {
        //TODO сделать нормальную обработку
        Optional<Stock> optionalStock = TwelveDataAPI.dataStocks.stream().filter(s -> s.getSymbol().equals(id)).findFirst();
        if (optionalStock.isEmpty()) {
            throw new Exception();
        }
        Stock stockFromData = optionalStock.get();
        if (stock.getQuantity() != null) {
            if (stockFromData.getQuantity() > stock.getQuantity()) {
                TwelveDataAPI.amount = TwelveDataAPI.amount + stockFromData.getCost();
            } else if (stockFromData.getQuantity() < stock.getQuantity()){
                TwelveDataAPI.amount = TwelveDataAPI.amount - stockFromData.getCost();
            }

            stockFromData.setQuantity(stock.getQuantity());
        }
        return stockFromData;
    }
}