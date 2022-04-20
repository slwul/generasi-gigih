import React, { useEffect, useState } from "react";
import Track from "../../components/Track";
import Searchbar from "../../components/Searchbar";
import config from "../../utils/config";
import FormPlaylist from "../../components/FormPlaylist";
import { getUserProfile } from "../../utils/fetchApi";

export default function Home () {
    const [tracks, setTracks] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [selectedTrackURI, setselectedTrackURI] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [user, setUser] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash);
        const accessTokenParams = params.get("#access_token");

        if (accessTokenParams !== null) {
            setAccessToken(accessTokenParams);
            setIsAuthorized(accessTokenParams !== null);

            const setUserProfile = async () => {
                try {
                    const response = await getUserProfile(accessTokenParams);

                    setUser(response);
                } catch (e) {
                    alert (e);
                }
            };
            setUserProfile();
        }
        
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
        const selectedSearchTracks = searchTracks.filter((data) => 
        selectedTrackURI.includes(data.uri)
        );
        setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
    };

    const clearSearch = () => {
        setTracks(selectedTracks);
        setIsSearch(false);
    };

    const toggleSelect = (track) => {
        const uri = track.uri;

        if (selectedTrackURI.includes(uri)) {
            setselectedTrackURI(selectedTrackURI.filter((item) => item !== uri));
            setSelectedTracks(selectedTrackURI.filter((item) => item.uri !==uri));
        } else {
            setselectedTrackURI([...selectedTrackURI, uri]);
            setSelectedTracks([...selectedTracks, track]);
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
                <h1>Music App</h1>
                <FormPlaylist
                    accessToken={accessToken}
                    userId={user.id}
                    uris={selectedTrackURI}
                />
                <hr />
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
                        select={selectedTrackURI.includes(track.uri)}
                        toogle={() => toggleSelect(track)}
                    />
                ))}
                </div>
            </>
        )}
        </div>
    );
}