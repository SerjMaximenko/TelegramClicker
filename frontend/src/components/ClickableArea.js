import React, {useState} from 'react';

function ClickableArea({ data }) {
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