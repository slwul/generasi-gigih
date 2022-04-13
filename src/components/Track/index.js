import React, { useState } from "react";

export default function Track({ url, title, artist, toggleSelect }) {
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
        setIsSelected(!isSelected);
        toggleSelect();
    };
    return (
        <div className="card-playlist">
            <img src={url} alt="Track Playlist"/>
            <h3 className="album-name">{title}</h3>
            <p className="artist-name">{artist}</p>
            <button 
                className={`btn btn-select ${
                isSelected ? "btn-primary" : "btn-secondary"}`}
                onClick={handleSelect}>
                {isSelected ? "Deselect" : "Select"}
            </button>
        </div>
    );
}
    