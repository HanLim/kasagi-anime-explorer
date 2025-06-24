import { useState, useEffect, useRef } from 'react';
import { BaseStore } from '../store/store';

import GenericButton from './GenericButton';

const Search = () => {
    const genre = BaseStore((state) => state.genre);
    const reset = BaseStore((state) => state.reset);

    const [searchText, setSearchText] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [filters, setFilters] = useState(null);
    const [searched, setSearched] = useState(false);

    const dropdownRef = useRef();

    const selectfilter = (key) => {
        setFilters(key);
    };

    const searchAnime = () => {
        setSearched(true);
        // call the search api here
    }

    const resetSearch = () => {
        setSearchText("");
        setFilters(null);

        if (searched) {
            setSearched(false);
            reset();
        }
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
                <GenericButton onClick={searchAnime} text={"Search"} />
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

export default Search;
