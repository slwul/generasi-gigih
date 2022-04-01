import React, { Component } from "react";
import config from "../../utils/config";

export default class Seachbar extends Component {
    state = {
        text: "",
    };

    handleInput(e) {
        this.setState({ text: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const { text } = this.state;

        var requestOption = {
            headers: {
                Autorization: "Bearer " + this.props.accessToken,
                "Content-Type" : "application/json",
            },
        };

        try {
            const response = await fetch(
                `${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`,
                requestOption
            ).then((data) => data.json());

            const tracks = response.track.items;
            this.props.onSuccess(tracks);
        } catch (e) {
            alert(e);
        }
    }

    render() {
        return (
            <form className="form-search" onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search..."
                        onChange={(e) => this.handleInput(e)}
                    />
                    <input type="submit" className="btn-primary" value="Search" />
                </div>
            </form>
        );
    }
 }

 export { Seachbar };