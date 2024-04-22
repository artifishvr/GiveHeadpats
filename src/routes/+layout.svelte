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
        Dropdown,
        DropdownItem,
        DropdownDivider,
    } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';
    import { account } from '$lib/appwrite';
    import { dev, version } from '$app/environment';
    import { inject } from '@vercel/analytics';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let pagePath = '';

    page.subscribe((path) => {
        pagePath = path.url.pathname;
    });

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

    onMount(() => {
        console.log('hiiiiii :3');
        console.log("if you know what you're doing here, come contribute at https://github.com/artifishvr/GiveHeadpats c:");
        const analyticsScript = document.createElement('script');
        analyticsScript.defer = true;
        analyticsScript.dataset.domain = 'pat.arti.lol';
        analyticsScript.src = 'https://a.arti.lol/js/script.js';
        document.head.appendChild(analyticsScript);
    });
</script>

{#if pagePath !== '/account/verify'}
    <Navbar class="drop-shadow-sm">
        <NavBrand href="/">
            <img src="/icon.webp" class="me-3 h-6 sm:h-9" alt="Headpats Icon" />
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Give Headpats</span>
            <a href="https://github.com/artifishvr/GiveHeadpats" target="_blank">
                <span class="ml-2 px-3 py-2 rounded-full bg-red-200 text-red-800 font-semibold">Open Alpha</span>
                <Tooltip type="light" placement="right">v{version}</Tooltip>
            </a>
        </NavBrand>
        <NavHamburger />
        <NavUl>
            <NavLi href="/">Home</NavLi>

            <NavLi href="/explore">Explore</NavLi>
            {#if loggedIn.user}
                <NavLi class="cursor-pointer">
                    Account<ChevronDownOutline class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline" />
                </NavLi>
                <Dropdown class="w-44 z-20">
                    <DropdownItem href="/@{loggedIn.user}">My Page</DropdownItem>
                    <DropdownItem href="/account/settings">Settings</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem
                        on:click={async () => {
                            await account.deleteSession('current');
                            loggedIn = false;
                        }}
                        href="#">Log Out</DropdownItem>
                </Dropdown>
            {:else}
                <NavLi href="/account/login">Log In / Sign Up</NavLi>
            {/if}
        </NavUl>
        <NavUl>
            <NavLi><DarkMode /></NavLi>
        </NavUl>
    </Navbar>
{/if}

<div class="p-4 md:p-8 bg-gray-50 dark:bg-slate-950 h-100 min-h-screen">
    <slot />
</div>

<Footer class="bg-white dark:bg-slate-950 p-4 drop-shadow-lg">
    <FooterCopyright href="https://arti.gay" by="ArtificialVR" copyrightMessage="All Rights Reserved." />
    <P class="text-center text-sm text-gray-500 sm:text-center dark:text-gray-400">Built with ❤️</P>
    <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <FooterLink href="/privacy">Privacy Policy</FooterLink>
        <FooterLink href="/tos">TOS</FooterLink>
    </FooterLinkGroup>
</Footer>
