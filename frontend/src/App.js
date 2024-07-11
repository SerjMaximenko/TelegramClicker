import React, { useEffect, useState } from 'react';
import { Utils } from './utils/Utils';
import axios from 'axios';
import ClickableArea from "./components/ClickableArea";
import ScrollingPanel from "./components/ScrollingPanel";
import { StockCostGenerator } from './utils/StockCostGenerator';

function App() {
    const [data, setData] = useState({ amount: 0 });
    const [timerTick, setTimerTick] = useState(0);
    const [stocks, setStocks] = useState([]);

    const [averageBuyStock, setAverageBuyStock] = useState(null);
    const generators = useState(() => Array.from({ length: 15 }, () => new StockCostGenerator()))[0];

    useEffect(() => {
        axios.get('http://localhost:8080/global')
            .then(response => {
                setData(response.data);
            });
        axios.get('http://localhost:8080/stocks')
            .then(response => {
                setStocks(response.data);
            });
        const interval = setInterval(() => {
            setTimerTick(t => t + 1);
        }, 300);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setStocks(stocks.map((stock, idx) => {
            if (timerTick % 3 === 0) {
                stock.cost = generators[idx].generateCost(stock.actualStockCost, stock.symbol);
            }
            if (stock.quantity > 0) {
                if (averageBuyStock === null) setAverageBuyStock(stock.cost);
                stock.costChange = Utils.round2(stock.cost - averageBuyStock);
            } else {
                stock.costChange = 0;
                setAverageBuyStock(0);
            }
            return { ...stock };  // Create a new stock object to avoid mutating state directly
        }));
    }, [timerTick]);

    useEffect(() => {
        let dividensSum = 0;
        stocks.forEach((stock) => {
            dividensSum += stock.dividends * stock.quantity;
        });
        setData(prevData => {
            const newAmount = Utils.round2(prevData.amount + dividensSum);
            return {...prevData, amount: newAmount};
        });
    }, [timerTick]);

    const handleButtonClick = (buy, sectionIndex) => {
        console.log('handleButtonClick 1')
        if (buy && (stocks[sectionIndex].cost > data.amount)) {
            return;
        }

        if (!buy && (stocks[sectionIndex].quantity - 1 < 0)) {
            return;
        }

        setData(prevData => {
            const newAmount = Utils.round2(buy ? prevData.amount - stocks[sectionIndex].cost : prevData.amount + stocks[sectionIndex].cost);
            return {...prevData, amount: newAmount};
        });

        setStocks(prevStocks => prevStocks.map((stock, idx) => {
            console.log('handleButtonClick 2')
            function putStock(newQuantity) {
                console.log("123")
                axios.put('http://localhost:8080/stocks/' + stock.symbol, {
                    symbol: stock.symbol,
                    quantity: newQuantity
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            }

            if (idx === sectionIndex) {
                if (buy) {
                    const newQuantity = stock.quantity + 1;
                    const newAverageBuyStock = (stock.averageBuyStock * stock.quantity + stock.cost) / newQuantity;
                    console.log("234")
                    putStock(newQuantity);
                    return {
                        ...stock,
                        quantity: newQuantity,
                        averageBuyStock: newAverageBuyStock,
                        costChange: Utils.round2(stock.cost - newAverageBuyStock),
                    };
                } else if (stock.quantity - 1 >= 0) {
                    const newQuantity = stock.quantity - 1;
                    putStock(newQuantity)
                    return {
                        ...stock,
                        quantity: newQuantity,
                        averageBuyStock: newQuantity === 0 ? 0 : stock.averageBuyStock,
                        costChange: newQuantity === 0 ? 0 : Utils.round2(stock.cost - stock.averageBuyStock),
                    };
                }
            }
            return stock;
        }));
    };

    return (
        <main>
            <ClickableArea data={data} />
            <ScrollingPanel onClick={handleButtonClick} amount={data.amount} stocks={stocks} />
            <div className="bottom-panel"></div>
        </main>
    );
}

export default App;