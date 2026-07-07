import type { Datacenter } from "$lib/types";

export const markerState = $state({
    datacenter: null as Datacenter | null,
    highlighted: [] as number[],
    preview: [] as number[],
    noPreview: true,
    largeMarker: false,
});

