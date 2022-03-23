const Search = () => {
    return <div>Hello World</div>
}

const SearchBar = () =>(
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search blog post</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            name="s"
        />
        <button type="submit">Search</button>
    </form>
);

// export default Search;
export default SearchBar;