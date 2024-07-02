import React, { useState } from 'react';
import axios from 'axios';

function SectionContainer({ stock }) {
    const [currentStock, setStock] = useState(stock);

    const handleBuyButtonClick = () => {
        console.log("click");
        axios.put('http://localhost:8080/stocks/' + stock.symbol, {
            symbol: currentStock.symbol,
            quantity: currentStock.quantity + 1
        })
            .then(function (response) {
                setStock(response.data)
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        
    };

    const handleSellButtonClick = () => {
        console.log("click");
        if ((currentStock.quantity - 1) >= 0) {
            axios.put('http://localhost:8080/stocks/' + stock.symbol, {
                symbol: currentStock.symbol,
                quantity: currentStock.quantity - 1
            })
                .then(function (response) {
                    setStock(response.data)
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    return (
        <div className="section_container">
            <button className="button_buy" onClick={handleBuyButtonClick}>Buy</button>
            <button className="button_sell" onClick={handleSellButtonClick}>Sell</button>
            <div className="info_panel"><span className="main_text cost_text" id="cost_text_0">{currentStock.cost}$</span><span
                className="main_text dividends_text" id="dividends_text_0">{currentStock.dividends}$</span><span
                className="main_text quantity_text" id="quantity_text_0">{currentStock.quantity}$</span><span
                className="main_text price_change_text" id="price_change_text_0">{currentStock.cost}$</span>
                <img className="info_img" alt={currentStock.symbol} src={`images/${currentStock.symbol}.png`}></img>
            </div>
        </div>
    );
}

export default SectionContainer;