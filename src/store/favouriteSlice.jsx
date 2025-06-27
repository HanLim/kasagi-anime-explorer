const createFavouriteSlice = (set, get) => ({
    favourited: get()?.favourited ?? new Map(),
    setFavourited: (anime) => set((state) => {
        const favourited = new Map(state.favourited);

        const id = anime.mal_id.toString();
        
        if (anime == null) {
            return { favourited: new Map() };
        }

        if (favourited.has(id)) {
            favourited.delete(id);
        } else {
            favourited.set(id, anime);
        }
        return { favourited: favourited };
    }),
});
export { createFavouriteSlice };
