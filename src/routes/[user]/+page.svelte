<script>
	import {
		Heading,
		P,
		Button,
		Avatar,
		Input,
		Label,
		Activity,
		ActivityItem,
	} from "flowbite-svelte";
	import { avatars, account } from "$lib/appwrite";

	export let data;

	let headpats = data.headpats;

	let message = "";
	let patcount = 1;

	const promise = account.get();

	let actor = "";

	promise.then(
		function (response) {
			if (response.name) {
				actor = response.name;
			} else {
				actor = "Guest";
			}
		},
		function (error) {
			actor = "Guest";
		}
	);

	let activities = [];

	data.allpats.forEach((pat) => {
		activities.push({
			title: `${pat.actor} sent ${pat.count} headpat(s)`,
			date: "just now",
			text: pat.message,
			avatar: avatars.getInitials(pat.actor),
		});
	});

	async function patpat() {
		const response = await fetch("/api/headpat", {
			method: "POST",
			body: JSON.stringify({
				user: data.user,
				actor: actor,
				message: message,
				patcount: 1,
			}),
			headers: {
				"content-type": "application/json",
			},
		});

		headpats = await response.json();
	}

	let avatarlink = avatars.getInitials(data.user);
</script>

<div class="text-center">
	<div class="flex justify-center items-center">
		<Avatar src={avatarlink} rounded size="lg" />
	</div>

	<Heading
		tag="h1"
		class="mb-4 mt-4"
		customSize="text-4xl md:text-5xl lg:text-5xl">{data.user}</Heading
	>
	<Heading
		tag="h2"
		class="mb-4"
		customSize="text-4xl  md:text-3xl lg:text-3xl"
		>Has earned {headpats} headpats!</Heading
	>
</div>

<div class="text-center pt-10">
	<Label for="message" class="mb-2">Message</Label>
	<Input
		class="mb-3"
		id="message"
		placeholder="You cute!"
		bind:value={message}
	/>
	<Label for="pat-count" class="mb-2">Pat Count</Label>
	<Input id="pat-count" class="mb-6" placeholder="1" bind:value={patcount} />
	<Button on:click={patpat} color="purple">Pat!!</Button>
</div>

<div class="w-96 pt-10">
	<Activity>
		<ActivityItem {activities} />
	</Activity>
</div>
