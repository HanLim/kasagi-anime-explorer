import { useEffect, useRef, useState } from 'react';

import Toast from './Toast';
import AnimeList from './AnimeList';
import Loading from './Loading';

import jikanClient from '../api/jikanApi';
import { BaseStore } from '../store/store';
import GenericButton from './GenericButton';
import Search from './Search';
import { DEFAULT } from '../store/animeSlice';
import NotFound from './404';


const Dashboard = () => {
    const page = BaseStore((state) => state.page);
    const setPage = BaseStore((state) => state.setPage);
    const animeList = BaseStore((state) => state.list);
    const setAnimeList = BaseStore((state) => state.setList);
    const setGenre = BaseStore((state) => state.setGenre);
    const genre = BaseStore((state) => state.genre);
    const listMode = BaseStore((state) => state.listMode);
    const searchText = BaseStore((state) => state.searchText);
    const searchGenre = BaseStore((state) => state.searchGenre);

    const toastRef = useRef();
    const isFetchingAnimeList = useRef(false);

    const [isLoading, setIsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    const fetchDefaultAnimeList = ({ page }) => {
        setIsLoading(true);
        jikanClient
            .getAnimeList({ page })
            .then((response) => {
                setAnimeList(response.data);
                setHasNextPage(response.pagination.has_next_page);
            })
            .catch((error) => {
                toastRef.current.show("Error loading anime list! " + error.message);
            })
            .finally(() => {
                setIsLoading(false);
                isFetchingAnimeList.current = false;
            });
    };

    const fetchSearchedAnimeList = ({ page, query, genres }) => {
        setIsLoading(true);

        jikanClient
            .searchAnime({ page, query, genres })
            .then((response) => {
                setAnimeList(response.data);
                setHasNextPage(response.pagination.has_next_page);
            })
            .catch((error) => {
                toastRef.current.show("Error loading anime list! " + error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const loadMore = () => {
        let queryPage = page + 1;
        setPage(queryPage);
        fetchSearchedAnimeList({ page: queryPage })
    }

    useEffect(() => {
        // to prevent double fetching in dev
        if (isFetchingAnimeList.current) return;

        // fetch list in default mode
        if (listMode === DEFAULT) {
            isFetchingAnimeList.current = true;
            fetchDefaultAnimeList({ page: 1 });
        } else {
            const query = searchText.trim();
            const genres = Array.from(searchGenre).map((id) => id.toString()).join(",");
            fetchSearchedAnimeList({ page, query, genres });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchGenres = async () => {
            if (genre.length > 0) return;
            jikanClient
                .getAnimeGenres()
                .then((response) => {
                    setGenre(response.data);
                })
                .catch((error) => {
                    toastRef.current.show("Error loading genre! " + error.message);
                });
        }

        fetchGenres();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id="main-body">
            <Search {...{ fetchSearchedAnimeList, fetchDefaultAnimeList }} />
            {animeList.length > 0 && <AnimeList animeList={animeList} />}
            {animeList.length === 0 && <NotFound/>}
            {isLoading && <Loading />}
            {!isLoading && animeList.length > 0 && hasNextPage && <GenericButton onClick={loadMore} text={"Load More"} />}
            <Toast ref={toastRef} />
        </div>
    );
};

export default Dashboard;
