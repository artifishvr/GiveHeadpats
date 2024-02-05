<script>
    import '../app.postcss';
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Tooltip,
        DarkMode,
        Footer,
        FooterCopyright,
        FooterLink,
        FooterLinkGroup,
        P,
    } from 'flowbite-svelte';
    import { account } from '$lib/appwrite';
    import { dev, version } from '$app/environment';
    import { inject } from '@vercel/analytics';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

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
    injectSpeedInsights();
</script>

<Navbar class="drop-shadow-sm">
    <NavBrand href="/">
        <img src="/icon.webp" class="me-3 h-6 sm:h-9" alt="Headpats Icon" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Give Headpats</span>
        <a href="https://github.com/artificialbutter/GiveHeadpats" target="_blank">
            <span class="ml-2 px-3 py-2 rounded-full bg-red-200 text-red-800 font-semibold">Open Alpha</span>
            <Tooltip type="light" placement="right">v{version}</Tooltip>
        </a>
    </NavBrand>
    <NavHamburger />
    <NavUl>
        {#if loggedIn.user}
            <NavLi href="/{loggedIn.user}">My Page</NavLi>
            <NavLi
                on:click={async () => {
                    await account.deleteSession('current');
                    loggedIn = false;
                }}
                href="#">Log Out</NavLi>
        {:else}
            <NavLi href="/account/login">Log In / Sign Up</NavLi>
        {/if}
    </NavUl>
    <NavUl>
        <NavLi><DarkMode /></NavLi>
    </NavUl>
</Navbar>

<div class="p-4 md:p-8 bg-gray-50 dark:bg-slate-950 h-100 min-h-screen">
    <slot />
</div>

<Footer class="bg-white dark:bg-slate-950 p-4 drop-shadow-lg">
    <FooterCopyright href="https://arti.gay" by="ArtificialVR" copyrightMessage="All Rights Reserved." />
    <P class="text-center text-sm text-gray-500 sm:text-center dark:text-gray-400">Built with ❤️</P>
    <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <FooterLink href="/account/privacy">Privacy Policy</FooterLink>
        <FooterLink href="/account/tos">TOS</FooterLink>
    </FooterLinkGroup>
</Footer>
