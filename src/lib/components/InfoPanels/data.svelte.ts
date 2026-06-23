import type { Network, Entry } from '$lib/types';

export const dataState: {
    networks?: { [key: number]: Network },
    networksDatacenters: { [key: number]: number[] },
    entries: { [key: string]: Entry };
} = $state.raw({
    networks: {},
    networksDatacenters: {},
    entries: {}
});

