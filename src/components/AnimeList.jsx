import PropTypes from 'prop-types';
import Card from './Card';

const AnimeList = ({ animeList }) => {
    return (
        <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3">
            {animeList.map((anime) => (
                <Card key={anime.mal_id} anime={anime} />
            ))}
        </div>
    );
};

AnimeList.propTypes = {
    animeList: PropTypes.array.isRequired,
};

export default AnimeList;