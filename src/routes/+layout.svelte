<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<nav>
    <a href="/">Home</a>
    <a href="/map">Map</a>
    <a href="/about">About</a>
</nav>

{@render children()}

<footer>© 2026 AIxDESIGN</footer>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
    }

    nav {
        position: fixed;
        z-index: 100;
        padding: 0.5em;
        background: white;
    }

    footer {
        position: fixed;
        bottom: 0;
    }
</style>
