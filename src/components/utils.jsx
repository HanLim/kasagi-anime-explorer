import { GoodScoreIcon, BadScoreIcon, NormalScoreIcon } from "./Icon";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

export const generateRatingIcon = (score) => {
    if (score >= 7) {
        return <GoodScoreIcon />;
    } else if (score >= 5) {
        return <NormalScoreIcon />;
    } else {
        return <BadScoreIcon />;
    }
};

export const generateGenre = (genres) => {
    return genres.slice(0, 3).map((item) => {
        return (
            <span
                key={item.mal_id}
                className="bg-blue-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded m-1"
            >
                {item.name}
            </span>
        );
    });
};

export const generateHeartIcon = (isFavourited, setFavourited, anime) => {
    const HeartIcon = isFavourited ? HeartSolid : HeartOutline;
    const color = isFavourited ? "text-red-500" : "text-gray-400";
    const classes = `cursor-pointer h-6 w-6 ${color}`;

    return <HeartIcon
        className={classes}
        onClick={() => setFavourited(anime)}
        data-testid="heart-icon"
    />;
}
