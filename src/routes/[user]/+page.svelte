<script>
	import { Heading, Button, Avatar, Input, Label, Activity, ActivityItem, Modal } from 'flowbite-svelte';
	import { avatars, account } from '$lib/appwrite';
	import relativeDate from '$lib/relativeDate';
	import { onMount } from 'svelte';
	import { Turnstile } from 'svelte-turnstile';

	export let data;

	let headpats = data.headpats;

	let message = '';
	let patcount = 1;

	const promise = account.get();

	let headpatModal = false;

	let actor = '';

	promise.then(
		function (response) {
			if (response.name) {
				actor = response.name;
			} else {
				actor = 'Guest';
			}
		},
		function (error) {
			actor = 'Guest';
		}
	);

	let activities = [];

	data.allpats.forEach((pat) => {
		if (activities.length > 5) return;
		if (pat.actor == 'system') return;

		activities.push({
			title: `${pat.actor} gave ${pat.count} headpat${pat.count > 1 ? 's' : ''}`,
			date: relativeDate(new Date(pat.$createdAt)),
			text: pat.message,
			avatar: avatars.getInitials(pat.actor),
		});
	});

	async function patpat() {
		if (data.status !== 200) return;
		const response = await fetch('/api/headpat', {
			method: 'POST',
			body: JSON.stringify({
				user: data.user,
				actor: actor,
				message: message,
				patcount: 1,
			}),
			headers: {
				'content-type': 'application/json',
			},
		});

		headpats = await response.json();
	}

	let avatarlink = avatars.getInitials(data.user);

	onMount(async () => {
		if (data.status == 404) {
			document.getElementById('main-interactive').innerHTML = '404';
			document.getElementById('submit-button').disabled = true; // disable submit button
		}
	});
</script>

<div class="bg-white gap-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p-4 rounded-lg drop-shadow-md mb-10">
	<Avatar src={avatarlink} size="lg" />
	<Heading tag="h1" class="mb-4 mt-4" customSize="text-2xl md:text-3xl lg:text-3xl">{data.user}</Heading>
	<Heading tag="h2" class="mb-4" customSize="text-1xl md:text-1xl lg:text-1xl">Has earned {headpats} headpats</Heading>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-" id="main-interactive">
	<div class="bg-white p-4 rounded-lg drop-shadow-md">
		<b>Headpat {data.user}!</b><br />
		description and stuff go here
	</div>
	<div class="bg-white p-4 rounded-lg drop-shadow-md">
		<div class="">
			<Heading tag="h3" class="mb-4" customSize="text-1xl"><b>Send headpats</b></Heading>
			<div class="flex">
				<Heading tag="h3" class="mb-4" customSize="text-md">Headpats</Heading>
				<Button
					class="w-10 h-10 mx-2"
					color="dark"
					pill
					on:click={() => {
						patcount -= 1;
					}}>-</Button>
				<Input id="pat-count" class="mb-6 w-12 text-center rounded-full" placeholder="1" bind:value={patcount} />
				<Button
					class="w-10 h-10 mx-2"
					color="dark"
					pill
					on:click={() => {
						patcount += 1;
					}}>+</Button>
			</div>
			<Label for="message" class="mb-2">Message (Optional)</Label>
			<Input class="mb-3" id="message" placeholder="You cute!" bind:value={message} />
			<Button id="submit-button" on:click={() => (headpatModal = true)} color="purple">Pat!!</Button>
		</div>
	</div>
	<div class="bg-white p-4 rounded-lg drop-shadow-md">
		<Heading tag="h3" class="mb-4" customSize="text-1xl"><b>Feed</b></Heading>
		<div class="pl-5">
			<Activity>
				<ActivityItem {activities} />
			</Activity>
		</div>
	</div>
</div>

<Modal title="Confirm Headpat" bind:open={headpatModal} autoclose outsideclose>
	<p>Are you sure you want to headpat {data.user}?</p>
	<Turnstile siteKey="0x4AAAAAAANZEO8eXr3R3FWN" theme="light" />
	<svelte:fragment slot="footer">
		<Button on:click={() => patpat()}>I accept</Button>
	</svelte:fragment>
</Modal>
