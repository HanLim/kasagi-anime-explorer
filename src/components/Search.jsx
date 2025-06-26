import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { BaseStore } from '../store/store';

import GenericButton from './GenericButton';
import { DEFAULT, SEARCHED } from '../store/animeSlice';

import jikanClient from '../api/jikanApi';

const Search = ({ toastRef, setIsLoading }) => {
    const page = BaseStore((state) => state.page);
    const genre = BaseStore((state) => state.genre);
    const reset = BaseStore((state) => state.reset);
    const listMode = BaseStore((state) => state.listMode);
    const setAnimeList = BaseStore((state) => state.setList);
    const setListMode = BaseStore((state) => state.setListMode);
    const searchText = BaseStore((state) => state.searchText);
    const setSearchText = BaseStore((state) => state.setSearchText);

    const searchGenre = BaseStore((state) => state.searchGenre);

    const [showDropdown, setShowDropdown] = useState(false);
    const [filters, setFilters] = useState(null);

    const dropdownRef = useRef();

    const selectfilter = (key) => {
        setFilters(key);
    };

    const searchAnime = () => {
        const query = searchText.trim();
        const genres = searchGenre;
        if (!query && !genres) return;

        setAnimeList([]);
        setListMode(SEARCHED);
        fetchSearchedAnimeList({ query, genres });
    }

    const resetSearch = () => {
        setSearchText("");
        setFilters(null);

        if (listMode === SEARCHED) {
            reset();
            setListMode(DEFAULT);
        }
    };

    const fetchSearchedAnimeList = ({ query, genres }) => {
        setIsLoading(true);

        jikanClient
            .searchAnime({ page, query, genres })
            .then((response) => {
                setAnimeList(response.data);
            })
            .catch((error) => {
                toastRef.current.show("Error loading anime list! " + error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const genreList = genre.map((item) =>
        <label key={item.mal_id} className="flex items-center space-x-2">
            <input
                type="radio"
                name="genre"
                checked={item.mal_id === filters}
                onChange={() => selectfilter(item.mal_id)}
            />
            <span>{item.name}</span>
        </label>
    );

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
        <div className="w-full">
            <div className="flex items-center space-x-4 p-4 border rounded-xl shadow-md bg-white w-full">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="flex-grow p-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
                <div className="relative">
                    <GenericButton onClick={searchAnime} text={"Search"} />
                </div>
                <div className="relative" ref={dropdownRef}>
                    <GenericButton onClick={() => setShowDropdown(!showDropdown)} text={"Filter"} />
                    {showDropdown && (
                        <div className="absolute h-40 overflow-scroll right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 p-2 space-y-2">
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
    toastRef: PropTypes.shape({ current: PropTypes.any }),
    setIsLoading: PropTypes.func.isRequired,
};

export default Search;
