import type { Map } from "maplibre-gl";
import type { Colour } from "./types";

export function colourToString(c: Colour | string): string {
    if (typeof c === "string")
        return c
    return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

export function colourDistSquared(a: Colour, b: Colour) {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
}


export function syncMaps(...maps: Map[]) {
    // Guard against re-entrancy when one map's jumpTo() triggers its own
    // "move" event, instead of removing/re-adding listeners on every frame.
    let syncing = false;

    const fns: Parameters<Map["on"]>[1][] = maps.map((map, index) => () => {
        if (syncing) return;
        syncing = true;

        const center = map.getCenter();
        const zoom = map.getZoom();
        const bearing = map.getBearing();
        const pitch = map.getPitch();
        const padding = map.getPadding();

        maps.forEach((clone, i) => {
            if (i === index) return;
            clone.jumpTo({
                center: center,
                zoom: zoom,
                bearing: bearing,
                pitch: pitch,
                padding: padding
            });
        });

        syncing = false;
    });

    maps.forEach((map, index) => {
        map.on("move", fns[index]);
    });

    return () => {
        maps.forEach((map, index) => {
            map.off("move", fns[index]);
        });
    };
}
