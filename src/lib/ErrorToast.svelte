<script>
    import { Toast } from 'flowbite-svelte';
      import { fly } from 'svelte/transition';

    import { CloseCircleSolid } from 'flowbite-svelte-icons';
    export let text = 'Error';
    export let show = false;
</script>

<Toast color="red" transition={fly} params={{ x: 200 }} bind:show>
    <svelte:fragment slot="icon">
        <CloseCircleSolid class="w-5 h-5" />
        <span class="sr-only">Error icon</span>
    </svelte:fragment>
    {text}
</Toast>
