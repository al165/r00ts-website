<script lang="ts">
    import type { Datacenter, Weather } from "$lib/types";
    import { markerState } from "./marker.svelte";

    let {
        zoom = 13,
        datacenter,
        weather = undefined,
        onclick,
    }: {
        zoom: number;
        datacenter: Datacenter;
        weather?: Weather;
        onclick: (e?: MouseEvent) => void;
    } = $props();

    let zoomed = $derived(zoom < 13);
    let open = $derived(markerState.datacenter?.id == datacenter.id);
    let highlighted = $derived(markerState.highlighted.includes(datacenter.id));
</script>

<!-- class:marker-open={open && !zoomed} -->
<div class="marker-root" class:front={open}>
    <div
        class="marker"
        class:marker-small={zoomed}
        class:highlighted
        {onclick}
        role="button"
        tabindex="0"
        aria-label="Datacenter"
        onkeydown={(e) => e.key === "Enter" && onclick?.()}
    >
        {#if open && !zoomed}
            <div class="title" class:highlighted>
                <h1>{datacenter.name}</h1>
                {#if weather}
                    <div class="weather">
                        {weather.temp}°C
                    </div>
                {/if}
            </div>
        {/if}
        {#if datacenter.filename && datacenter.precise}
            <img
                class="aerial"
                src="/images/aerial/{datacenter.filename}"
                alt="Aerial view of {datacenter.name}"
            />
        {/if}
    </div>
</div>

<style>
    .marker-root {
        position: relative;
        pointer-events: all;
    }

    .marker {
        max-height: 350px;
        max-width: 350px;
        background: #e7e7e7;
        padding: 0.8em;
        transition-property: max-width, max-height, min-width !important;
        transition-duration: 1s !important;
        position: relative;
        cursor: pointer;
        z-index: 2;
    }

    .aerial {
        background-size: cover;
        height: 100%;
        box-sizing: border-box;
    }

    img {
        width: 100%;
    }

    .marker-small {
        max-width: 50px;
        max-height: 50px;
    }

    .highlighted {
        background: #edff00 !important;
    }

    .title {
        box-sizing: border-box;
        position: absolute;
        right: 0;
        bottom: 100%;
        width: 100%;
        background: #e7e7e7;
        padding: 0.8em;
        overflow: hidden;
    }

    h1 {
        font-size: 12pt;
        margin: 0 auto;
    }

    .weather {
        position: absolute;
        bottom: 100%;
        right: 0;
        padding: 0.4em 0.6em;
        background-color: white;
        font-family: sans-serif;
        font-size: 10pt;
        font-weight: 600;
    }

    :global(.datacenter-marker) {
        z-index: 2;
        pointer-events: all;
    }

    :global(.datacenter-marker:has(.front)) {
        z-index: 10;
    }
</style>
