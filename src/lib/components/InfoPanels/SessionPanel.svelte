<script lang="ts">
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";

    import { dataState } from "./data.svelte";

    let { hostname }: { hostname?: string } = $props();

    function onclick() {
        goto(resolve("/"), {}).then(() => {
            dataState.entries = {};
            dataState.networks = {};
            dataState.networksDatacenters = {};
        });
    }
</script>

<div class="container">
    {#if hostname}
        <div class="url">{hostname}</div>
    {/if}
    <button {onclick}>Exit session</button>
</div>

<style>
    .container {
        position: absolute;
        top: 2em;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        z-index: 12;
        padding: 0;
    }

    .url {
        font-family: inherit;
        background: white;
        display: inline-block;
        padding: 0.5em 1em;
    }

    button {
        font-family: inherit;
        font-size: inherit;
        border: none;
        padding: 0.5em 1em;
        background: #ff65ad;
        cursor: pointer;
        margin: 0;
        box-sizing: border-box;
    }
</style>
