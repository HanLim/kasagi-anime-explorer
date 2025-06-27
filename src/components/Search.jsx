import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { BaseStore } from '../store/store';

import GenericButton from './GenericButton';
import { DEFAULT, SEARCHED } from '../store/animeSlice';


const Search = ({ fetchSearchedAnimeList, fetchDefaultAnimeList }) => {
    const page = BaseStore((state) => state.page);
    const genre = BaseStore((state) => state.genre);
    const reset = BaseStore((state) => state.reset);
    const listMode = BaseStore((state) => state.listMode);
    const searchText = BaseStore((state) => state.searchText);
    const searchGenre = BaseStore((state) => state.searchGenre);

    const setAnimeList = BaseStore((state) => state.setList);
    const setListMode = BaseStore((state) => state.setListMode);
    const setSearchText = BaseStore((state) => state.setSearchText);
    const setSearchGenre = BaseStore((state) => state.setSearchGenre);
    const setPage = BaseStore((state) => state.setPage);

    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef();

    const selectfilter = (key) => {
        setSearchGenre(key);
    };

    const searchAnime = () => {
        const query = searchText.trim();
        const genres = Array.from(searchGenre).map((id) => id.toString()).join(",");
        if (!query && !genres) return;

        setAnimeList([]);
        setListMode(SEARCHED);

        let searchPage = page;

        if (listMode === DEFAULT) {
            setPage(1);
            searchPage = 1;
        }
        fetchSearchedAnimeList({ page: searchPage, query, genres });
    }

    const resetSearch = () => {
        setSearchText("");
        setSearchGenre(null);

        if (listMode === SEARCHED) {
            reset();
            setListMode(DEFAULT);
            fetchDefaultAnimeList({ page: 1 });
        }
    };

    const genreList = genre.map((item) => (
        <label key={item.mal_id} className="flex items-center space-x-2">
            <input
                type="checkbox"
                name="genre"
                value={item.mal_id}
                checked={searchGenre.has(item.mal_id) || false}
                onChange={() => selectfilter(item.mal_id)}
            />
            <span>{item.name}</span>
        </label>
    ));

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full p-8">
            <div className="flex items-center space-x-4 p-4 border rounded-xl shadow-md bg-white w-full">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchAnime();
                        }
                    }}
                    className="flex-grow p-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
                <div className="relative">
                    <GenericButton onClick={searchAnime} text={"Search"} />
                </div>
                <div className="relative" ref={dropdownRef}>
                    <GenericButton onClick={() => setShowDropdown(!showDropdown)} text={"Filter"} />
                    {showDropdown && (
                        <div className="custom-scrollbar absolute h-40 overflow-scroll right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 p-2 space-y-2">
                            {genreList}
                        </div>
                    )}
                </div>
                <div className="relative">
                    <GenericButton onClick={resetSearch} text={"Reset"} />
                </div>
            </div>
        </div>
    );
};

Search.propTypes = {
    fetchSearchedAnimeList: PropTypes.func.isRequired,
    fetchDefaultAnimeList: PropTypes.func.isRequired,
};

export default Search;
