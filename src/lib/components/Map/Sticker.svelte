<script lang="ts">
    interface Props {
        emoji: string;
        onclick: (e: MouseEvent) => void;
    }

    let { emoji, onclick }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="emoji" {onclick}>{emoji}</div>

<style>
    .emoji {
        font-size: 24pt;
    }
</style>
