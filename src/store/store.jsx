import { create } from 'zustand'
import { createAnimeSlice } from './animeSlice'

export const BaseStore = create((...a) => ({
    ...createAnimeSlice(...a),
}))