package com.maksimenko.Clicker.service;

import com.maksimenko.Clicker.api.TwelveDataAPI;
import com.maksimenko.Clicker.model.GlobalInfo;
import org.springframework.stereotype.Service;

@Service
public class GlobalInfoServiceImpl implements GlobalInfoService {
    @Override
    public GlobalInfo getAmount() {
        TwelveDataAPI.amount = TwelveDataAPI.amount + TwelveDataAPI.dataStocks.stream()
                .mapToDouble(stock -> stock.getDividends() * stock.getQuantity()).sum();
        return new GlobalInfo(TwelveDataAPI.amount);
    }
}
