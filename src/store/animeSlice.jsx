export const createAnimeSlice = (set) => ({
    list: [],
    page: 1,
    genre: [],
    setList: (list) => set((state) => ({ list: [...state.list, ...list] })),
    setPage: (page) => set({ page }),
    setGenre: (genre) => set({ genre }),
    reset: () => set({ list: [], page: 1 }),
});
