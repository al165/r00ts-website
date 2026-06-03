import type { GlyphParams } from './types.ts';

export const glyphSize = $state({ value: 10 });

export const glyphState: GlyphParams[] = $state.raw([
    {
        glyphName: "line_h",
        label: "water",
        rgb: [255, 255, 255],
        bg: "#99c1f1",
        fg: "#FFF",
    },
    {
        glyphName: "cross",
        label: "grass",
        rgb: [255, 0, 255],
        bg: "#FFF",
        fg: "#ff70b3",
    },
    {
        glyphName: "blank",
        label: "land",
        rgb: [0, 0, 255],
        bg: "#FFF",
        fg: "#ff70b3",
    },

    {
        glyphName: "wedge",
        label: "wood",
        rgb: [0, 255, 255],
        bg: "#FFF",
        fg: "#ff70b3",
    },
    {
        glyphName: "blank",
        label: "residential",
        rgb: [0, 255, 0],
        bg: "#FFF",
        fg: "#ff70b3",
    }
]);
