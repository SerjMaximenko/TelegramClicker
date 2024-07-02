package com.maksimenko.Clicker.service;

import com.maksimenko.Clicker.model.Client;
import com.maksimenko.Clicker.model.Stock;

import java.util.List;

public interface StockService {
    List<Stock> readAll();

    Stock updateById(String id, Stock stock) throws Exception;
}