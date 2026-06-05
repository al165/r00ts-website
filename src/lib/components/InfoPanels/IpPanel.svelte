<script lang="ts">
    import type { Entry, Network } from "$lib/types";

    import { markerState } from "../Map/marker.svelte";

    interface Props {
        entries: { [key: string]: Entry };
        networks: { [key: number]: Network };
        networksDatacenters: { [key: number]: number[] };
        pageUrl?: string;
    }

    let { entries, networks, networksDatacenters, pageUrl }: Props = $props();
    let selectedNetId: number | null = $state(null);

    function preview(netId: number | null) {
        if (netId == null || !networksDatacenters[netId])
            markerState.preview = [];
        else markerState.preview = networksDatacenters[netId];
    }

    $effect(() => {
        if (selectedNetId == null) {
            markerState.highlighted = [];
            return;
        }

        $inspect(selectedNetId);
        $inspect(networksDatacenters[selectedNetId]);

        markerState.highlighted = networksDatacenters[selectedNetId];
    });

    const pageHostname = $derived.by(() => {
        if (pageUrl) return new URL(pageUrl).hostname;

        return null;
    });

    const networkIps: { [key: number]: Entry[] } = $derived.by(() => {
        const result: { [key: number]: Entry[] } = {};
        for (const ip of Object.keys(entries)) {
            const entry = entries[ip];
            if (!entry.network_id) continue;

            if (!result[entry.network_id]) result[entry.network_id] = [];

            result[entry.network_id].push(entries[ip]);
        }

        return result;
    });
</script>

<div class="container">
    <span>[ {pageHostname} ]</span>
    {#each Object.keys(networkIps) as netId}
        <div
            class="entry"
            class:selected={selectedNetId == parseInt(netId)}
            onclick={() =>
                (selectedNetId =
                    selectedNetId == parseInt(netId) ? null : parseInt(netId))}
            onmouseover={() => {
                preview(parseInt(netId));
            }}
            onfocus={() => {
                preview(parseInt(netId));
            }}
            onmouseout={() => {
                preview(null);
            }}
            onblur={() => {
                preview(null);
            }}
            role="button"
            tabindex="0"
            aria-label="Datacenter"
            onkeydown={() => {}}
        >
            <span> {networks[parseInt(netId)].network_name} </span>
            {#each networkIps[parseInt(netId)] as entry}
                <span class="ip">{entry.ip}</span>
            {/each}

            {#if selectedNetId == parseInt(netId) && selectedNetId != null}
                <div class="entry-info">
                    <div class="entry-data">
                        <span>{networks[selectedNetId].organisation_name}</span>
                        <table>
                            <tbody>
                                {#each networkIps[selectedNetId] as entry}
                                    <tr>
                                        <td><span>({entry.count})</span></td>
                                        <td><span>{entry.hostname}</span></td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    .container {
        background: #e7e7e7;
        display: flex;
        flex-direction: column;
        font-family: "JetBrains Mono", monospace;
        font-weight: 600;
        font-size: 16pt;
        position: absolute;
        left: 1em;
        top: 2em;
        z-index: 10;
    }

    .ip {
        padding-left: 2em;
    }

    .entry {
        position: relative;
        cursor: pointer;
        border: none;
        text-align: left;
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
        display: flex;
        flex-direction: column;
        padding: 0 1em;
    }

    .entry-data {
        padding: 0 1em;
        min-width: 20em;
        display: flex;
        flex-direction: column;
    }

    .entry-info,
    .selected,
    .entry:hover {
        background: #edff00;
    }

    .entry-info {
        position: absolute;
        left: 100%;
        top: 0px;
        width: auto;
        transition: width 1s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
</style>
