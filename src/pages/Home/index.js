import React, { Component } from "react";
import Track from "../../components/Track";
import Searchbar from "../../components/Searchbar";
import config from "../../utils/config";

export default class Home extends Component {
    state = {
        accessToken : "",
        isAuthorize : false,
        tracks : [],
    };

    componentDidMount() {
        const accessToken = new URLSearchParams(window.location.hash).get(
            "#access_token"
            );

        this.setState({ accessToken, isAuthorize: accessToken !== null });
    }

    getSpotifyLinkAuthorize() {
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_API_KEY;
        const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
        const REDIRECT_AFTER_LOGIN = "http://localhost:3000";

        return `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${clientId}&response_type=token&redirect_uri=${REDIRECT_AFTER_LOGIN}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
    }

    handleSuccessSearch(tracks) {
        this.setState({ tracks });
    }

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