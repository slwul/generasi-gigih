import logo from './logo.svg';
import './App.css';
import Search from './search';

function App() {
  const clientId = process.env.REACT_APP_CLIENT_KEY;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Search />
      </header>
    </div>
  );
}

export default App;
