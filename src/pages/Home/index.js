import React, { useEffect, useState } from "react";
import Track from "../../components/Track";
import Searchbar from "../../components/Searchbar";
import config from "../../utils/config";

export default function Home () {
    const [tracks, setTracks] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [selectedTrackURI, setselectedTrackURI] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash);
        const accessToken = params.get("#access_token");
        setAccessToken(accessToken);
        setIsAuthorized(accessToken !== null);
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

    const handleSuccessSearch = (searchTracks) => {
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

    const toggleSelect = (track) => {
        const uri = track.uri;

        if (selectedTrackURI.includes(uri)) {
            setselectedTrackURI(selectedTrackURI.filter((item) => item !== uri));
        } else {
            setselectedTrackURI([...selectedTrackURI, uri]);
        }
    };

    return (
        <div className="container">
        {!isAuthorized && (
            <div className="login-app">
                <p>Please login to Spotify here.</p>
                <a href={getSpotifyLinkAuthorize()} className="btn btn-primary">
                    Login
                </a>
            </div>
        )}

        {isAuthorized && (
            <>
                <h1>Music Playlist</h1>
                <Searchbar
                accessToken={accessToken}
                onSuccess={(tracks) => handleSuccessSearch(tracks)}
                onClearSearch={clearSearch}
            />
            {tracks.length === 0 && <p>No tracks</p>}

                <div className="track-list">
                {tracks.map((track) => (
                    <Track
                        key={track.id}
                        url={track.album.images[0].url}
                        title={track.name}
                        artist={track.artists[0].name}
                        toggleSelect={() => toggleSelect(track)}
                    />
                ))}
                </div>
            </>
        )}
        </div>
    );
}