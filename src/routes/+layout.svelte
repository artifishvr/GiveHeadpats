<script>
    import '../app.postcss';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    import { account } from '$lib/appwrite';
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

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
        },
    );

    inject({ mode: dev ? 'development' : 'production' });
</script>

<Navbar class="drop-shadow-sm">
    <NavBrand href="/">
        <img src="/icon.webp" class="me-3 h-6 sm:h-9" alt="Headpats Icon" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Give Headpats</span>
        <a href="https://github.com/artificialbutter/GiveHeadpats" target="_blank">
            <span class="ml-2 px-3 py-2 rounded-full bg-red-200 text-red-800 font-semibold">Open Alpha</span>
        </a>
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
