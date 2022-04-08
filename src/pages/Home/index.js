import React, { Component, useEffect, useState } from "react";
import Track from "../../components/Track";
import Searchbar from "../../components/Searchbar";
import config from "../../utils/config";

export default function Home () {
    const [tracks, setTracks] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [isAuthorize, setisAuthorize] = useState(false);
    const [selectedTrackURI, setselectedTrackURI] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash);
        const accessToken = params.get("#access_token");
        setAccessToken(accessToken);
        setisAuthorize(accessToken !== null);
    }, []); 

    useEffect(() => {
        if (!isSearch) {
            const selectedTracks = filterSelectedTracks();
            setTracks(selectedTracks);
        }
    }, [selectedTrackURI]);

    const getSpotifyLinkAuthorize = () => {
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_API_KEY;

        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${config.RESPONSE_TYPE}&redirect_uri=${config.REDIRECT_URI}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
    };

    const filterSelectedTracks = () => {
        return tracks.filter((track) => selectedTrackURI.includes(track.uri));
    };

    const handleSuccessSearch(selectedTracks) => {
        setIsSearch(true);
        const selectedTracks = filterSelectedTracks();

        const searchDistinctTracks = searchTracks.filter(
            (track) => !selectedTrackURI.includes(track.uri)
        );
        setTracks([...selectedTracks, ...searchDistinctTracks]);
    };

    const clearSearch = () => {
        const selectedTracks = filterSelectedTracks();

        setTracks(selectedTracks);
        setIsSearch(false);
    };

    render() {
        return (
            <div className="container">
            {!this.state.isAuthorize && (
                <div className="login-app">
                    <p>Please login to Spotify here.</p>
                    <a href={this.getSpotifyLinkAuthorize()} className="btn-primary">
                        Login
                    </a>
                </div>
            )}

            {this.state.isAuthorize && (
                <>
                    <h1>Music Playlist</h1>
                    <Searchbar
                    accessToken={this.state.accessToken}
                    onSuccess={(tracks) => this.handleSuccessSearch(tracks)}
                />
                {this.state.tracks.length === 0 && <p>No tracks</p>}

                    <div className="track-list">
                    {this.state.tracks.map((track) => (
                        <Track
                        key={track.id}
                        url={track.album.images[0].url}
                        title={track.name}
                        artist={track.artists[0].name}
                        />
                    ))}
                    </div>
                </>
            )}
            </div>
        );
    }
}

export { Home };