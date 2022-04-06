import React, { useState} from "react";

export default function Track({ url, title, artist, toggleSelect }) {
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
        setIsSelected(!isSelected);
        toggleSelect();
    };
    return (
        <div className="cardPlaylist">
            <img src={url} alt="imagePlaylist"/>
            <h3 className="albumName">{title}</h3>
            <p className="artistName">{artist}</p>
            <button 
                className={`btn btnSelect ${
                isSelected ? "btnPrimary" : "btnSecondary"}`}
                onClick={handleSelect}>
                {isSelected ? "Deselect" : "Select"}
            </button>
        </div>
    );
}
    