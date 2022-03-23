import './App.css';
import data from './data.js';
// import Search from './search';

function App() {
  // const clientId = process.env.REACT_APP_CLIENT_KEY;
  return (
    <div className="container">
      <h1>Playlist Music</h1>
      <div className="cardPlaylist">
        <img src={data.album.images[0].url} alt="imagePlaylist"/>
        <h3>{data.album.name}</h3>
        <p>{data.album.artists[0].name}</p>
        <button className="btnSelect">Select</button>
      </div>
      {/* <Search /> */}
    </div>
  );
}

export default App;
