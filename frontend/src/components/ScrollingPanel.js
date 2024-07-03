import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SectionContainer from './SectionContainer';

function ScrollingPanel() {
    const [data, setData] = useState([]);


    useEffect(() => {
        const interval = setInterval(()=>{
            axios.get('http://localhost:8080/stocks').then(response => {
                console.log(response.data);
                setData(response.data);
            });
        },1000);

        return () => clearInterval(interval);
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