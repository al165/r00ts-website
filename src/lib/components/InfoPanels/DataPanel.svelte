<script lang="ts">
    import type { Entry } from "$lib/types";
    import { markerState } from "../Map/marker.svelte";

    interface Props {
        entries: { [key: string]: Entry };
        networksDatacenters: { [key: number]: number[] };
    }

    let { entries, networksDatacenters }: Props = $props();

    let datacenter_id = $derived(markerState.datacenter?.id);

    let ips = $derived.by(() => {
        if (datacenter_id == undefined || entries == null) return [];

        let ip_list: string[] = [];
        for (const [ip, entry] of Object.entries(entries)) {
            const { network_id } = entry;
            if (network_id == undefined) continue;

            if (networksDatacenters[network_id]?.includes(datacenter_id))
                ip_list.push(ip);
        }
        return ip_list;
    });
</script>

<div
    class="container"
    class:hidden={markerState.datacenter == null}
    class:animated={markerState.datacenter != null}
>
    <div class="panel">
        <button
            class="close-btn"
            onclick={() => {
                markerState.datacenter = null;
            }}
            >X
        </button>
        {#if markerState.datacenter}
            {#if markerState.datacenter.links?.length}
                <h1>
                    <a
                        href={markerState.datacenter.links[0]}
                        rel="noopener"
                        target="_blank"
                    >
                        {markerState.datacenter.name}
                    </a>
                </h1>
            {:else}
                <h1>{markerState.datacenter.name}</h1>
            {/if}
            {#if markerState.datacenter.precise}
                <div>
                    <span>Lat: {markerState.datacenter.lat}</span>
                    <span>Lon: {markerState.datacenter.lon}</span>
                </div>
            {/if}
            <span>City: {markerState.datacenter.city}</span>
            {#if ips.length > 0}
                <p>Potentially served:</p>
                <div class="ip-list">
                    {#each ips as ip}
                        <span class="indent">{ip}</span>
                    {/each}
                </div>
            {/if}
        {/if}
    </div>
</div>

<style>
    a {
        color: blue;
    }

    a:visited {
        color: blue;
    }

    .animated {
        transition: width 1s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .container {
        position: absolute;
        right: 3em;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 11;
        width: 350px;
        overflow: hidden;
        height: 70%;
    }

    .panel {
        position: relative;
        background-color: #e7e7e7;
        padding: 1.5em;
        width: 350px;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .hidden {
        width: 0px;
    }

    .indent {
        padding-left: 1em;
    }

    .close-btn {
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        padding: 1em;
        cursor: pointer;
    }

    .ip-list {
        flex-grow: 2;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
    }
</style>
