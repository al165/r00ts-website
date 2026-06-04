import { mount } from "svelte";

import maplibregl from "maplibre-gl";

import type { Datacenter, Weather } from "$lib/types";
import Marker from "./Marker.svelte";


export const markerState = $state({
    activeId: null as number | null,
    datacenter: null as Datacenter | null
});

export function addMarker(
    map: maplibregl.Map,
    {
        datacenter,
        weather,
    }: {
        datacenter: Datacenter;
        weather?: Weather;
    },
) {
    const zoomState = $state({ value: map.getZoom() });

    async function onclick(e?: MouseEvent) {
        e?.stopPropagation();

        const isOpening = markerState.activeId != datacenter.id;
        markerState.activeId = isOpening ? datacenter.id : null;
        markerState.datacenter = datacenter;

        if (datacenter.filename == null && datacenter.precise) {
            fetch(`/api/aerial/${datacenter.id}`)
                .then(res => res.json())
                .then(data => {
                    datacenter.filename = data.filename;
                }).catch(err => {
                    console.error(err);
                })
        }
    }

    const el = document.createElement("div");
    const component = mount(Marker, {
        target: el,
        props: {
            get zoom() {
                return zoomState.value;
            },
            get open() {
                return markerState.activeId === datacenter.id;
            },
            datacenter,
            weather,
            onclick
        },
    });

    el.classList.add('datacenter-marker');

    const marker = new maplibregl.Marker({ element: el })
        .setLngLat([datacenter.lon, datacenter.lat])
        .addTo(map);

    return { marker, component, zoomState };
}
