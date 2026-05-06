<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
</nav>

{@render children()}

<footer>© 2026 AIxDESIGN</footer>
