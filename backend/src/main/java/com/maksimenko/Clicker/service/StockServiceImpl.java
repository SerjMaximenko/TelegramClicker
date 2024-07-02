package com.maksimenko.Clicker.service;

import com.maksimenko.Clicker.api.TwelveDataAPI;
import com.maksimenko.Clicker.model.Stock;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StockServiceImpl implements StockService {

    @Override
    public List<Stock> readAll() {
        System.out.println("123123123");
        TwelveDataAPI api = new TwelveDataAPI();
        System.out.println(api.getAllPrices(TwelveDataAPI.dataStocks));
        return new ArrayList<>(api.getAllPrices(TwelveDataAPI.dataStocks));
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
            stockFromData.setQuantity(stock.getQuantity());
        }
        return stockFromData;
    }
}