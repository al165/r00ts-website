<script lang="ts">
    import type { Entry, Network } from "$lib/types";

    import { markerState } from "../Map/marker.svelte";

    interface Props {
        entries: { [key: string]: Entry };
    }

    let { entries }: Props = $props();
    let selected: Entry | undefined = $state();

    let networks: {
        [key: string]: { network: Network; datacenter_ids: number[] };
    } = $state({});

    function updateSelectedIp() {
        if (!selected) return;

        markerState.highlighted = networks[selected.ip].datacenter_ids;
    }

    $effect(() => {
        if (!selected) {
            markerState.highlighted = [];
            return;
        }

        if (!networks[selected.ip]) {
            fetch(`/api/network/${selected.ip}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.reserved || !selected) return;

                    networks[selected.ip] = data;
                    updateSelectedIp();
                });
        } else {
            updateSelectedIp();
        }
    });
</script>

<div class="container">
    {#each Object.keys(entries) as ip}
        <button
            class="entry"
            class:selected={selected?.ip == ip}
            onclick={() => (selected = entries[ip])}
        >
            {ip}
        </button>
    {/each}
    <div class="entry-info" class:hidden={!selected}>
        <div class="entry-data">
            <p>{selected?.hostname}</p>
            {#if selected && networks[selected.ip]}
                <p>
                    {networks[selected.ip].network.network_name}
                    ({networks[selected.ip].network.organisation_name}) [AS{networks[
                        selected.ip
                    ].network.asn}]
                </p>
                <p></p>
            {/if}
        </div>
        {#if selected}
            <button
                class="close-btn"
                onclick={() => {
                    selected = undefined;
                }}
            >
                close
            </button>
        {/if}
    </div>
</div>

<style>
    .container {
        background: #e7e7e7;
        padding: 1em;
        display: flex;
        flex-direction: column;
        font-family: "JetBrains Mono", monospace;
        font-weight: 600;
        position: absolute;
        left: 3em;
        top: 3em;
        z-index: 10;
    }

    .entry {
        cursor: pointer;
        border: none;
        text-align: left;
        font-family: inherit;
        font-weight: inherit;
        font-size: 16pt;
    }

    .entry-data {
        padding: 1em;
        min-width: 20em;
    }

    .entry-info,
    .selected,
    .entry:hover {
        background: #edff00;
    }

    .entry-info {
        position: absolute;
        left: 100%;
        top: 0;
        width: auto;
        transition: width 1s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .close-btn {
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        background: none;
        cursor: pointer;
    }

    .hidden {
        width: 0px;
    }
</style>
