import { SvelteSet } from "svelte/reactivity";

let openTooltips: SvelteSet<symbol> = new SvelteSet();
let currentTooltip: null | symbol = $state(null);

export enum TooltipPositions {
    UPPER_RIGHT,
    MIDDLE_RIGHT,
    LOWER_RIGHT,
    LOWER_CENTER,
    LOWER_LEFT,
    MIDDLE_LEFT,
    UPPER_LEFT,
    UPPER_CENTER
};

export function getTooltipState() {
    return {
        get active() { return currentTooltip },
        set active(id: symbol | null) { currentTooltip = id },
        get openTooltips() { return openTooltips },
        open(id: symbol) {
            openTooltips.add(id);
            currentTooltip = id;
        },
        close(id: symbol) {
            openTooltips.delete(id);
            currentTooltip = null;
        },
        toggle(id: symbol) {
            if (openTooltips.has(id)) {
                openTooltips.delete(id);
                currentTooltip = null;
            }
            else {
                openTooltips.add(id);
                currentTooltip = id;
            }
        },
        closeAll() { openTooltips.clear() }
    }
}
