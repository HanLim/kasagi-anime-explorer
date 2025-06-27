export const createAnimeSlice = (set) => ({
    list: [],
    page: 1,
    genre: [],
    listMode: DEFAULT,
    isLoading: false,
    searchText: "",
    searchGenre: new Set(),




    setList: (list) => set((state) => {
        if (list.length === 0) {
            return { list: [] };
        }
        return { list: [...state.list, ...list] };
    }),
    setPage: (page) => set({ page }),
    setGenre: (genre) => set({ genre }),
    reset: () => set({ list: [], page: 1 }),
    setListMode: (mode) => set({ listMode: mode }),
    setLoading: (isLoading) => set({ isLoading }),
    setSearchText: (text) => set({ searchText: text }),
    setSearchGenre: (genre) => set((state) => {
        const newSet = new Set(state.searchGenre);

        if (genre == null) {
            return { searchGenre: new Set() };
        }

        if (newSet.has(genre)) {
            newSet.delete(genre);
        } else {
            newSet.add(genre);
        }
        return { searchGenre: newSet };
    }),
});


export const DEFAULT = 0;
export const SEARCHED = 1;