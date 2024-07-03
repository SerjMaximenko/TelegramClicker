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
public class GlobalInfoController {

    private final GlobalInfoService globalInfoService;

    @Autowired
    public GlobalInfoController(GlobalInfoService globalInfoService) {
        this.globalInfoService = globalInfoService;
    }

    //TODO вынести в отдельный эндпоинт
    @GetMapping(value = "/global")
    public ResponseEntity<GlobalInfo> readAmount() {
        return new ResponseEntity<>(globalInfoService.getAmount(), HttpStatus.OK);
    }

//    @PutMapping(value = "/global")
//    public ResponseEntity<Stock> update(@RequestBody Stock stock) throws Exception {
//        System.out.println("updateGlobal");
//        return new ResponseEntity<>(globalInfoService.updateById(id, stock), HttpStatus.OK);
//    }
}
