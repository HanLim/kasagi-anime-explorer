import { useEffect, useRef, useState } from 'react';

import Toast from './Toast';
import AnimeList from './AnimeList';
import Loading from './Loading';

import JikanAPI from '../api/jikanApi';
import { BaseStore } from '../store/store';
import GenericButton from './GenericButton';
import Search from './Search';

const jikanClient = new JikanAPI();

const Dashboard = () => {
    const page = BaseStore((state) => state.page);
    const setPage = BaseStore((state) => state.setPage);
    const animeList = BaseStore((state) => state.list);
    const setAnimeList = BaseStore((state) => state.setList);
    const setGenre = BaseStore((state) => state.setGenre);
    const genre = BaseStore((state) => state.genre);

    const toastRef = useRef();
    const isFetchingAnimeList = useRef(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAnime = async () => {
            if (isFetchingAnimeList.current) return;
            isFetchingAnimeList.current = true;

            setIsLoading(true);

            jikanClient
                .getAnimeList(page)
                .then((response) => {
                    setAnimeList(response.data);
                })
                .catch((error) => {
                    toastRef.current.show("Error loading anime list! " + error.message);
                })
                .finally(() => {
                    setIsLoading(false);
                    isFetchingAnimeList.current = false;
                });
        };

        fetchAnime();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

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
            <Search />
            <AnimeList animeList={animeList} />
            {isLoading && <Loading />}
            {!isLoading && <GenericButton onClick={() => setPage(page + 1)} text={"Load More"} />}
            <Toast ref={toastRef} />
        </div>
    );
};

export default Dashboard;
