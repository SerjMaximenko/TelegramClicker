import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StockCostGenerator } from '../utils/StockCostGenerator';
import { Utils } from '../utils/Utils'

function SectionContainer({ stock, onBuy }) {
    const [costChange, setCostChange] = useState(stock.costChange);
    const [cost, setCost] = useState(stock.cost);
    const [quantity, setQuantity] = useState(stock.quantity);
    const [averageBuyStock, setAverageBuyStock] = useState(null);
    const [timerTick, setTimerTick] = useState(0);
    const [generator] = useState(new StockCostGenerator());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimerTick((t) => t + 1);
            }, 300);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timerTick%3 === 0) {
            setCost(generator.generateCost(stock.cost, stock.symbol));
        }
        if (quantity > 0) {
            if (averageBuyStock === null) {
                setAverageBuyStock(cost);
            }
            setCostChange(Utils.round2(cost - averageBuyStock));
        } else {
            setCostChange(0);
            setAverageBuyStock(0);
        }
    }, [timerTick]);


    const handleBuyButtonClick = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;

            if (averageBuyStock === null || prevQuantity === 0) {
                setAverageBuyStock(cost / newQuantity);
            } else {
                setAverageBuyStock((averageBuyStock * prevQuantity + cost) / newQuantity);
            }

            if (averageBuyStock !== 0) {
                setCostChange(Utils.round2(cost - averageBuyStock));
            }

            axios.put(`http://localhost:8080/stocks/${stock.symbol}`, {
                symbol: stock.symbol,
                quantity: newQuantity
            })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
            onBuy(cost, true);
            return newQuantity;
        });
    };

    const handleSellButtonClick = () => {
        if ((quantity - 1) >= 0) {
            setQuantity(quantity - 1);
            axios.put('http://localhost:8080/stocks/' + stock.symbol, {
                symbol: stock.symbol,
                quantity: stock.quantity - 1
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            onBuy(cost, false);
        }
        if (quantity === 0) {
            setAverageBuyStock(0);
        }
    };

    return (
        <div className="section_container">
            <button className="button_buy" onClick={handleBuyButtonClick}>Buy</button>
            <button className="button_sell" onClick={handleSellButtonClick}>Sell</button>
            <div className="info_panel"><span className="main_text cost_text" id="cost_text_0">{cost}$</span><span
                className="main_text dividends_text" id="dividends_text_0">{stock.dividends}$</span><span
                className="main_text quantity_text" id="quantity_text_0">{quantity}$</span><span
                className="main_text price_change_text" id="price_change_text_0">{costChange}$</span>
                <img className="info_img" alt={stock.symbol} src={`images/${stock.symbol}.png`}></img>
            </div>
        </div>
    );
}

export default SectionContainer;