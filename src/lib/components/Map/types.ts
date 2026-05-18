export type Colour = [number, number, number];

export type GlyphDrawFn = {
    (
        ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
        s: number,
        c: Colour | string,
    ): void;
};

export type PaletteItem = {
    name: string,
    label: string,
    rgb: Colour,
    fg?: Colour | string,
    bg?: Colour | string,
    canvas: OffscreenCanvas | null,
};
