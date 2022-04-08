import React, { useState } from "react";
import config from "../../utils/config";

export default function Seachbar ({ accessToken, onSuccess, onClearSearch}) {
    const [text, setText] = useState ("");

    const handleInput = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestOptions = {
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type" : "application/json",
            },
        };

        try {
            const response = await fetch(
                `${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`,
                requestOptions
            ).then((data) => data.json());

            const tracks = response.tracks.items;
            onSuccess(tracks);
        } catch (e) {
            alert(e);
        }
    };

    const clearSearch = () => {
        setText("");
        onClearSearch();
    };
    return (
        <div className="search-wrapper">
            <form className="form-search" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search..."
                        onChange={handleInput}
                        required
                        value={text}
                    />
                    <input type="submit" className="btn btn-primary" value="Search" />
                </div>
            </form>
            <button className="btn btn-text" onClick={clearSearch}>
                clear Search
            </button>
        </div>
    );
}