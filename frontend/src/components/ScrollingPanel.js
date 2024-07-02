import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SectionContainer from './SectionContainer';

function ScrollingPanel() {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("click");
        axios.get('http://localhost:8080/stocks').then(response => {
            console.log(response.data);
            setData(response.data);
        });
    }, []);

    return (
        <div id="scrolling-panel">
            {data.map((item, index) => (
                <SectionContainer key={index} stock={item} />
            ))}
        </div>
    );
}

export default ScrollingPanel;