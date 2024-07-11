package com.maksimenko.Clicker.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.maksimenko.Clicker.model.Stock;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public class TwelveDataAPI {

    public final static List<String> symbols = new ArrayList<>(Arrays.asList("AAPL", "MSFT", "AMZN", "GOOGL", "META",
            "TSLA", "JNJ", "JPM", "NVDA", "V", "BABA", "WMT", "DIS", "PG", "BRK.B"));

    public final static List<Double> dividends = new ArrayList<>(Arrays.asList(0.82, 2.24, 1.28, 3.11, 1.33, 1.23, 4.18, 3.6, 0.64, 1.28, 1.0, 2.16, 1.88, 2.33, 0.92));

    //TODO перенести в базу
    public static List<Stock> dataStocks = new ArrayList<>();

    public static Double amount = 1000d;

    static {
        for (int i = 0; i < symbols.size(); i++) {
            double dividend = dividends.get(i);
            dataStocks.add(new Stock(symbols.get(i), 0.0, 0.0, dividend, 0));
        }
    }

    public static List<Stock> stockPrices = new ArrayList<>();

    private Double getPrice(String symbol) {
        String url = "https://finnhub.io/api/v1/quote?symbol=" + symbol + "&token=cq0mtchr01qs7bcgoch0cq0mtchr01qs7bcgochg";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(response.getBody());
        return jsonNode.get("c").asDouble();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Stock> getAllPrices(){
        TwelveDataAPI.dataStocks.forEach(stock -> {
            if ((stock.getActualStockCost() == null) || (stock.getActualStockCost() == 0d)) {
                Double actualStockCost = getPrice(stock.getSymbol());
                stock.setActualStockCost(actualStockCost);
                stock.setCost(actualStockCost);
            }
        });
        return TwelveDataAPI.dataStocks;
    }
}