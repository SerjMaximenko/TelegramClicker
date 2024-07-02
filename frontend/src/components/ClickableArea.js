import React, {useEffect, useState} from 'react';
import axios from 'axios';

function ClickableArea() {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("click");
        const interval = setInterval(()=>{
            axios.get('http://localhost:8080/global').then(response => {
                // console.log(response.data);
                setData(response.data);
            });
        },1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='clickable-area'>
            <div className='money-container'>,
                <div className='amount'>
                    <img src='images/money.png' alt='money' className='money-img'/>
                        <span id="money_img">{data.amount}</span>
                </div>
            </div>
        </div>
    );
}

export default ClickableArea;