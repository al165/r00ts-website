import { mount } from "svelte";
import { SvelteSet } from "svelte/reactivity";

import Sticker from "./Sticker.svelte";
import maplibregl from "maplibre-gl";

export const stickerMap: Record<string, string> = {
    "bug": "🐛",
};

export let stickerState: {
    avaliable: SvelteSet<string>,
    locationMarker: maplibregl.Marker | null
} = $state({ avaliable: new SvelteSet(Object.keys(stickerMap)), locationMarker: null });

export function addSticker(map: maplibregl.Map, lngLat: maplibregl.LngLatLike, markerName: string = "bug") {
    let emoji = stickerMap[markerName];

    function onclick() {
        stickerState.avaliable.add(markerName);
        if (stickerState.locationMarker === emojiMarker)
            stickerState.locationMarker = null;
        emojiMarker.remove();
    }

    const el = document.createElement("div");
    const component = mount(Sticker, {
        target: el,
        props: {
            emoji,
            onclick
        },
    });

    const emojiMarker = new maplibregl.Marker({ element: el, draggable: true })
        .setLngLat(lngLat)
        .addTo(map);

    stickerState.avaliable.delete(markerName);

    return { marker: emojiMarker, component };
};

