<script>
    import { Toast } from 'flowbite-svelte';
    import { blur } from 'svelte/transition';

    export let text = 'Error';
    export let show = false;
</script>

<Toast color="red" transition={blur} params={{ amount: 10 }} bind:show position="top-right">
    <svelte:fragment slot="icon">
        <span class="sr-only">Error icon</span>
    </svelte:fragment>
    {text}
</Toast>
