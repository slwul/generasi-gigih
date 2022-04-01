const Track = ({ url, title, artist }) => {
    return (
        <div className="cardPlaylist">
            <img src={url} alt="imagePlaylist"/>
            <h3 className="albumName">{title}</h3>
            <p className="artistName">{artist}</p>
            <button className="btn-primary btnSelect">Select</button>
        </div>
    );
};
    
export default Track;