import React, { useState } from 'react';
import ClientForm from './ClientForm';
import ClientList from './ClientList';
import ClickableArea from "./components/ClickableArea";
import ScrollingPanel from "./components/ScrollingPanel";

function App() {
    return (
        <body>
            <main>
                <ClickableArea></ClickableArea>
                <ScrollingPanel/>
                <div className="bottom-panel"></div>
            </main>
        </body>
    );
}

export default App;