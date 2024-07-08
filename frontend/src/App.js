import React, { useEffect, useState } from 'react';
import { Utils } from './utils/Utils'
import axios from 'axios';
import ClickableArea from "./components/ClickableArea";
import ScrollingPanel from "./components/ScrollingPanel";

function App() {
    const [data, setData] = useState({ amount: 0 });

    useEffect(() => {
        axios.get('http://localhost:8080/global')
            .then(response => {
                setData(response.data);
            });
    }, []);

    const handleBuy = (cost, buy) => {
        setData((prevData) => {
            const newAmount = Utils.round2(buy ? prevData.amount - cost : prevData.amount + cost);
            return { ...prevData, amount: newAmount };
        });
    };

    return (
        <body>
            <main>
                <ClickableArea data={data} />
                <ScrollingPanel onBuy={handleBuy} />
                <div className="bottom-panel"></div>
            </main>
        </body>
    );
}

export default App;