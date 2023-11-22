<script>
    import '../app.postcss';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    import { account } from '$lib/appwrite';

    let loggedIn = {};
    loggedIn.status = false;

    const promise = account.get();

    promise.then(
        function (response) {
            loggedIn.status = true;
            loggedIn.user = response.name;
        },
        function (error) {
            loggedIn.status = false;
        }
    );
</script>

<svelte:head>
    <title>give headpats</title>
</svelte:head>

<Navbar class="drop-shadow-sm">
    <NavBrand href="/">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">give headpats</span>
    </NavBrand>
    <NavHamburger />
    <NavUl>
        {#if loggedIn.user}
            <NavLi href="/{loggedIn.user}">My Page</NavLi>
            <NavLi href="/account">Account</NavLi>
            <NavLi
                on:click={async () => {
                    await account.deleteSession('current');
                    loggedIn = false;
                }}
                href="#">Log Out</NavLi>
        {:else}
            <NavLi href="/account/login">Log In</NavLi>
            <NavLi href="/account/signup">Sign Up</NavLi>
        {/if}
    </NavUl>
</Navbar>

<div class="p-4 md:p-8 bg-white h-100 min-h-screen">
    <slot />
</div>
