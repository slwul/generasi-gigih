import "./App.css";
import data from "./data.js";
import Track from "./components/Track";

function App() {
  // const clientId = process.env.REACT_APP_CLIENT_KEY;
  return (
    <div className="container">
      <h1 className="titlePlaylist">Playlist Music</h1>
      <Track
        url={data.album.images[0].url}
        title={data.album.name}
        artist={data.album.artists[0].name}
      />
    </div>
  );
}

export default App;
