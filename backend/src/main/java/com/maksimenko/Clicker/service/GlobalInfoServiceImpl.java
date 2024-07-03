package com.maksimenko.Clicker.service;

import com.maksimenko.Clicker.api.TwelveDataAPI;
import com.maksimenko.Clicker.model.GlobalInfo;
import com.maksimenko.Clicker.utils.StockUtils;
import org.springframework.stereotype.Service;

@Service
public class GlobalInfoServiceImpl implements GlobalInfoService {
    @Override
    public GlobalInfo getAmount() {
        double dividendsSum = TwelveDataAPI.dataStocks.stream()
                .mapToDouble(stock -> stock.getDividends() * stock.getQuantity()).sum();
        System.out.println(dividendsSum);
        TwelveDataAPI.amount = TwelveDataAPI.amount + (dividendsSum / 100);
        System.out.println(TwelveDataAPI.amount);
        return new GlobalInfo(StockUtils.round2(TwelveDataAPI.amount));
    }
}
