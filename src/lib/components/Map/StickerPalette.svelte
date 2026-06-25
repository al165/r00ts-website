<script lang="ts">
    import { stickerMap, stickerState } from "./sticker.svelte";

    function ondragstart(e: DragEventInit, name: string) {
        if (e.dataTransfer) {
            e.dataTransfer.clearData();
            e.dataTransfer.setData("text/plain", name);
        }
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

<div class="palette" class:hidden={stickerState.avaliable.size == 0}>
    {#each stickerState.avaliable as stickerName}
        {#if stickerMap[stickerName]}
            <div
                class="sticker"
                ondragstart={(e) => ondragstart(e, stickerName)}
                draggable="true"
            >
                {stickerMap[stickerName]}
            </div>
        {/if}
    {/each}
</div>

<style>
    .palette {
        display: inline-flex;
        flex-direction: column;
    }

    .hidden {
        display: none;
    }

    .sticker {
        text-align: center;
        cursor: grab;
        user-select: none;
    }
</style>
