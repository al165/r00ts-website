<script lang="ts">
    import Button from "../Button.svelte";

    import { markerState } from "$lib/components/Map/marker.svelte";

    let show = $state(false);

    function onclick() {
        show = !show;
        markerState.datacenter = null;
    }
</script>

<div class="button-container">
    <Button {onclick}>about</Button>
</div>

<div class="container" class:hidden={!show}>
    <div class="panel">
        <button class="close-btn" {onclick}>X</button>
        <h1>About r00ts</h1>
        <p>
            r00ts connects the websites you visit to the datacenters that
            faciltate them.
        </p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
            dignissimos soluta itaque dicta unde ullam dolor corrupti veritatis
            modi quo a, provident atque expedita quod. Similique aspernatur quam
            facere omnis?
        </p>
        <hr />
        <p>
            Map data: <a href="https://openfreemap.org/" target="_blank">
                OpenFreeMap
            </a>
            <a href="https://www.openmaptiles.org/" target="_blank">
                ©OpenMapTiles
            </a>
            <a href="https://www.openstreetmap.org/copyright" target="_blank">
                OpenStreetMap
            </a>
            <br />Aerial images:
            <a href="https://www.mapbox.com/about/maps" target="_blank">
                ©Mapbox
            </a>
            <a href="https://www.maxar.com" target="_blank"> ©Maxar </a>
        </p>
        <p>©2026 AIxDESIGN</p>
    </div>
</div>

<style>
    .container,
    .panel {
        width: 400px;
    }

    .container {
        position: absolute;
        top: 5em;
        right: 2em;
        height: calc(100vh - 5em - 8em);
        z-index: 11;
        overflow: hidden;
        transition: width 1s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .panel {
        position: relative;
        background-color: white;
        padding: 1.5em;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .hidden {
        width: 0px;
    }

    button {
        border: none;
        cursor: pointer;
        padding: 1em;
        font-family: inherit;
        background: inherit;
    }

    .button-container {
        position: absolute;
        top: 1em;
        right: 1em;
        z-index: 5;
    }

    .close-btn {
        position: absolute;
        top: 0;
        right: 0;
    }

    hr {
        width: 100%;
    }
</style>
