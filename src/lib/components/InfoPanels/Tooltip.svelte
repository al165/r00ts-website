<script lang="ts">
    import Icon from "@iconify/svelte";
    import { getTooltipState, TooltipPositions } from "./tooltip.svelte";

    interface Props {
        children: any;
        background?: string;
        position?: TooltipPositions;
    }
    let {
        children,
        background,
        position = TooltipPositions.UPPER_RIGHT,
    }: Props = $props();

    let id = Symbol();
    const tooltipState = getTooltipState();

    let element: HTMLElement;

    let open = $derived.by(() => {
        return tooltipState.openTooltips.has(id);
    });

    let posRight = $derived(
        position == TooltipPositions.UPPER_RIGHT ||
            position == TooltipPositions.LOWER_RIGHT ||
            position == TooltipPositions.MIDDLE_RIGHT,
    );

    let posLeft = $derived(
        position == TooltipPositions.UPPER_LEFT ||
            position == TooltipPositions.LOWER_LEFT ||
            position == TooltipPositions.MIDDLE_LEFT,
    );

    let posLower = $derived(
        position == TooltipPositions.LOWER_CENTER ||
            position == TooltipPositions.LOWER_LEFT ||
            position == TooltipPositions.LOWER_RIGHT,
    );

    let posUpper = $derived(
        position == TooltipPositions.UPPER_CENTER ||
            position == TooltipPositions.UPPER_LEFT ||
            position == TooltipPositions.UPPER_RIGHT,
    );

    let posCenter = $derived(
        position == TooltipPositions.LOWER_CENTER ||
            position == TooltipPositions.UPPER_CENTER,
    );

    let posMiddle = $derived(
        position == TooltipPositions.MIDDLE_LEFT ||
            position == TooltipPositions.MIDDLE_RIGHT,
    );
</script>

<div class="container">
    <button
        onclick={(ev) => {
            ev.preventDefault();
            tooltipState.toggle(id);
        }}
        bind:this={element}
        style:background
    >
        ?
    </button>
    {#if open}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="tooltip"
            class:posRight
            class:posLeft
            class:posCenter
            class:posMiddle
            class:posUpper
            class:posLower
            style:background
            class:above={tooltipState.active == id}
            onclick={() => {
                tooltipState.active = id;
            }}
        >
            {@render children?.()}
            <button class="close-btn" onclick={() => tooltipState.close(id)}>
                <Icon icon="material-symbols:close" />
            </button>
        </div>
    {/if}
</div>

<style>
    .container {
        display: inline-block;
        position: relative;
    }

    button {
        border: none;
        font-size: inherit;
        font-family: inherit;
        padding: 0;
        cursor: pointer;
        aspect-ratio: 1;
        height: 1.5em;
    }

    .tooltip {
        position: absolute;
        z-index: 12;
        min-width: 20em;
        background: #e7e7e7;
        padding: 1em;
        font-size: 12pt;
    }

    .posRight {
        left: 120%;
    }

    .posLeft {
        right: 120%;
    }

    .posUpper {
        bottom: 120%;
    }

    .posLower {
        top: 120%;
    }

    .posMiddle {
        top: 50%;
        transform: translateY(-50%);
    }

    .posCenter {
        left: 50%;
        transform: translateX(-50%);
    }

    .above {
        z-index: 13;
    }

    .close-btn {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.5em 1em;
        background: inherit;
    }
</style>
