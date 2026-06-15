import maplibregl from "maplibre-gl";
import { mount, unmount } from "svelte";
import LocationMarker from "./LocationMarker.svelte";

let watchId: number;
let locationMarker: maplibregl.Marker;
let component: { $set?: any, $get?: any };

export let showLocation = $state({ value: false });

function success(map: maplibregl.Map, position: GeolocationPosition) {
    // Success
    if (!locationMarker) {
        const locationMarkerEl = document.createElement("div");
        locationMarkerEl.style.zIndex = "5";
        component = mount(LocationMarker, { target: locationMarkerEl });

        locationMarker = new maplibregl.Marker({
            element: locationMarkerEl,
        })
            .setLngLat([
                position.coords.longitude,
                position.coords.latitude,
            ])
            .addTo(map);

        map.flyTo({
            center: locationMarker.getLngLat(),
            zoom: 12,
        });
    } else {
        // update location marker
        locationMarker.setLngLat([
            position.coords.longitude,
            position.coords.latitude,
        ]);
    }
}

function error(error: GeolocationPositionError) {
    showLocation.value = false;
    console.log(
        `Geolocation Error: ${error.code}: ${error.message}`,
    );
}

export function getUserLocation(map: maplibregl.Map) {
    if (!showLocation.value) {
        watchId = window.navigator.geolocation.watchPosition(
            (position) => success(map, position),
            error,
            {
                enableHighAccuracy: true,
            },
        );
    } else {
        locationMarker?.remove();

        if (watchId != undefined)
            window.navigator.geolocation.clearWatch(watchId);
    }

    showLocation.value = !showLocation.value;
}

export function destroyLocationMarker() {

    if (watchId != undefined)
        window.navigator.geolocation.clearWatch(watchId);

    if (component)
        unmount(component);
}
