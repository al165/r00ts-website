<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<nav>
    <h1>r00ts</h1>
</nav>

{@render children()}

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: "Jetbrains Mono", monospace;
    }

    h1 {
        font-size: 42pt;
        padding: 0em 1em;
        margin: 0em;
        user-select: none;
    }

    nav {
        position: fixed;
        z-index: 100;
    }
</style>
