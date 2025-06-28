import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAnimeSlice } from './animeSlice';
import { createFavouriteSlice } from './favouriteSlice';

export const BaseStore = create(
    persist(
        (set, get) => ({
            ...createAnimeSlice(set),
            ...createFavouriteSlice(set, get),
        }),
        {
            name: 'anime-favourites',

            // only persist favourited
            partialize: (state) => ({
                favourited: Object.fromEntries(state.favourited),
            }),

            storage: {
                getItem: (name) => {
                    const str = sessionStorage.getItem(name);
                    if (!str) return null;
                    try {
                        const data = JSON.parse(str);
                        if (data.state?.favourited) {
                            data.state.favourited = new Map(Object.entries(data.state.favourited));
                        }
                        return data;
                    } catch (e) {
                        console.error("Failed to parse persisted state:", e);
                        return null;
                    }
                },
                setItem: (name, value) => {
                    try {
                        const cloned = { ...value };
                        if (cloned.state?.favourited instanceof Map) {
                            cloned.state.favourited = Object.fromEntries(cloned.state.favourited);
                        }
                        sessionStorage.setItem(name, JSON.stringify(cloned));
                    } catch (e) {
                        console.error("Failed to serialize state:", e);
                    }
                },
                removeItem: (name) => sessionStorage.removeItem(name),
            },
        }
    )
);
