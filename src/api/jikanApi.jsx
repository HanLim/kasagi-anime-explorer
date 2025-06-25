import BaseAPI from "./base";

class JikanAPI extends BaseAPI {
    constructor() {
        super("https://api.jikan.moe/v4");
    }

    // the reason to set it to 12 is because depending on screen size,
    // there will be 1 / 2 / 3 per row
    async getAnimeList({ page = 1, limit = 12 }) {
        return this.get("/top/anime", { page, limit });
    }

    async getAnimeDetails({ id }) {
        return this.get(`/anime/${id}`);
    }

    async searchAnime({ query, genres, page, limit = 12 }) {
        return this.get("/anime", { q: query, genres, page, limit });
    }

    async getAnimeGenres() {
        return this.get("/genres/anime");
    }
}

const jikanClient = new JikanAPI();
export default jikanClient;