import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SectionContainer from './SectionContainer';

function ScrollingPanel({ onClick, amount, stocks }) {

    return (
        <div id="scrolling-panel">
            {stocks.map((stock, index) => (
                <SectionContainer key={index} sectionIndex={index} stock={stock} onClick={onClick}/>
            ))}
        </div>
    );
}

export default ScrollingPanel;