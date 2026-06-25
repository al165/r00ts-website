<script lang="ts">
    import { onMount } from "svelte";

    import IpPanel from "$lib/components/InfoPanels/IpPanel.svelte";
    import SummaryPanel from "$lib/components/InfoPanels/SummaryPanel.svelte";
    import Map from "$lib/components/Map/Map.svelte";

    import { dataState } from "$lib/components/InfoPanels/data.svelte.js";
    import AboutPanel from "$lib/components/InfoPanels/AboutPanel.svelte";
    import SessionPanel from "$lib/components/InfoPanels/SessionPanel.svelte";
    import type { Datacenter } from "$lib/types.js";

    const { data } = $props();

    onMount(() => {
        dataState.networks = data.networks;
        dataState.networksDatacenters = data.networksDatacenters;
        dataState.entries = data.entries;
    });

    let datacenters: Datacenter[] = $derived(data.datacenters);
</script>

<div class="contents">
    <Map
        {datacenters}
        showDebug={data.showDebug}
        leftPadding={data.entries ? 500 : 100}
    >
        {#if data.entries}
            <SessionPanel hostname={data.pageUrl} />
            <IpPanel />
            <SummaryPanel
                entries={data.entries}
                datacenters={data.datacenters}
                pageUrl={data.pageUrl}
            />
        {:else}
            <a
                href="https://github.com/al165/r00ts-extension/releases/tag/v0.5"
            >
                <button id="r00ts-download-btn">
                    Download the extension (Firefox and Chrome!)
                </button>
            </a>
        {/if}
        <AboutPanel />
    </Map>
</div>

<style>
    .contents {
        padding: 0em;
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
    }

    #r00ts-download-btn {
        position: absolute;
        bottom: 2em;
        left: 2em;
        z-index: 12;
        padding: 1em 2em;
        font-family: inherit;
        font-size: 12pt;
        background: #ff70b3;
        border: none;
        cursor: pointer;
    }
</style>
