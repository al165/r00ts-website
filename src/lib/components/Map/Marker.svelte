<script lang="ts">
    import type { Datacenter, Weather } from "$lib/types";

    let {
        zoom = 13,
        open = false,
        datacenter,
        weather = undefined,
        onclick,
    }: {
        zoom: number;
        open: boolean;
        datacenter: Datacenter;
        weather?: Weather;
        onclick: (e?: MouseEvent) => void;
    } = $props();

    let zoomed = $derived(zoom < 13);
</script>

<div class="marker-root" class:front={open}>
    <div
        class="marker"
        class:marker-open={open}
        class:marker-small={zoomed}
        class:marker-unknown={datacenter.filename == null}
        {onclick}
        role="button"
        tabindex="0"
        aria-label="Datacenter"
        onkeydown={(e) => e.key === "Enter" && onclick?.()}
    >
        {#if open && !zoomed}
            <div class="title">
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
        height: 200px;
        width: 200px;
        background: yellow;
        padding: 0.8em;
        transition-property: width, height !important;
        transition-duration: 1s !important;
        position: relative;
        cursor: pointer;
        z-index: 2;
    }

    .marker-open,
    .marker:hover {
        transform: scale(1.1);
    }

    .aerial {
        background-size: cover;
        height: 100%;
        box-sizing: border-box;
    }

    .marker-small {
        width: 50px;
        height: 50px;
    }

    .marker-unknown {
        width: 8px;
        height: 8px;
    }

    .title {
        box-sizing: border-box;
        position: absolute;
        right: 0;
        bottom: 100%;
        width: 100%;
        background-color: yellow;
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
