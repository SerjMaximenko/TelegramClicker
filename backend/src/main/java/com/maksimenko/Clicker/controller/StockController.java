package com.maksimenko.Clicker.controller;

import com.maksimenko.Clicker.model.GlobalInfo;
import com.maksimenko.Clicker.model.Stock;
import com.maksimenko.Clicker.service.GlobalInfoService;
import com.maksimenko.Clicker.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class StockController {

    private final StockService stockService;

    @Autowired
    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping(value = "/stocks")
    public ResponseEntity<List<Stock>> read() {
        final List<Stock> clients = stockService.readAll();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @PutMapping(value = "/stocks/{id}")
    public ResponseEntity<Stock> update(@PathVariable("id") String id, @RequestBody Stock stock) throws Exception {
        System.out.println("updateById");
        return new ResponseEntity<>(stockService.updateById(id, stock), HttpStatus.OK);
    }
}
