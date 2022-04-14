import React, { useState } from "react";
import { addTracksToPlaylist, createPlaylist } from "../../utils/fetchApi";

export default function FromPlaylist({ accessToken, userId, uris}) {
    const[playlist, setPlaylist] = useState({
        title: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPlaylist({...playlist, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (playlist.title.length > 10){
            try {
                const responsePlaylist = await createPlaylist (accessToken, userId,{
                    name: playlist.title,
                    description: playlist.description,
                });

                await addTracksToPlaylist(accessToken, responsePlaylist.id, uris);

                setPlaylist({
                    title: "",
                    description: "",
                });

                alert("Playlist created!");
            } catch (e) {
                alert(e);
            }
        }else {
            alert("Title must be at least 10 characters long.");
        }
    };

    return (
        <div className="form-section">
			<h1 className="section-title">Create Playlist</h1>
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							name="title"
                            id="title"
                            value={playlist.title}
                            onChange={handleChange}
							placeholder="Insert playlist title"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="desc">Description</label>
						<textarea
							name="description"
                            id="desc"
                            value={playlist.description}
                            onChange={handleChange}
							placeholder="Describe the contents of the playlist"
                            required
						></textarea>
					</div>
				    <button class="btn btn-submit" type="submit">Submit</button>
				</form>
		</div>
    );
}