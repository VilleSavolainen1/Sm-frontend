import React from 'react';
import './drawertoggle.css';

const Drawertoggle = ({showSidebar, setShowsidebar}) => {

    const toggleSidebar = () => {
        !showSidebar ? setShowsidebar(true) : setShowsidebar(false);
    }

    return (
        <button className="togglebutton" onClick={() => toggleSidebar()}>
            <div className="togglebutton_line" />
            <div className="togglebutton_line" />
            <div className="togglebutton_line" />
        </button>
    )
}



export default Drawertoggle