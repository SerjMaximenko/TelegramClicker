import React from 'react';
import ClickableArea from "./components/ClickableArea";
import ScrollingPanel from "./components/ScrollingPanel";

function App() {
    return (
        <body>
            <main>
                <ClickableArea/>
                <ScrollingPanel/>
                <div className="bottom-panel"></div>
            </main>
        </body>
    );
}

export default App;