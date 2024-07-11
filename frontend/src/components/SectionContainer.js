import React, { useEffect, useState } from 'react';
import { Utils } from '../utils/Utils';

function SectionContainer({ sectionIndex, stock, onClick }) {
    const [costChange, setCostChange] = useState(stock.costChange);
    const [cost, setCost] = useState(stock.cost);
    const [quantity, setQuantity] = useState(stock.quantity);

    useEffect(() => {
        setCostChange(stock.costChange);
        setCost(stock.cost);
        setQuantity(stock.quantity);
    }, [stock]);

    const handleBuyButtonClick = () => {
        onClick(true, sectionIndex);
    };

    const handleSellButtonClick = () => {
        console.log(sectionIndex);
        onClick(false, sectionIndex);
    };

    return (
        <div className="section_container">
            <button className="button_buy" onClick={handleBuyButtonClick}>Buy</button>
            <button className="button_sell" onClick={handleSellButtonClick}>Sell</button>
            <div className="info_panel">
                <span className="main_text cost_text" id="cost_text_0">{cost}$</span>
                <span className="main_text dividends_text" id="dividends_text_0">{stock.dividends}$</span>
                <span className="main_text quantity_text" id="quantity_text_0">{quantity}</span>
                <span className="main_text price_change_text" id="price_change_text_0">{costChange}$</span>
                <img className="info_img" alt={stock.symbol} src={`images/${stock.symbol}.png`}></img>
            </div>
        </div>
    );
}

export default SectionContainer;