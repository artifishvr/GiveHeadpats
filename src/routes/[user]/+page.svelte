<script>
	import { Heading, P, Button, Avatar } from "flowbite-svelte";
	import { avatars } from "$lib/appwrite";

	export let data;

	let headpats = data.headpats;

	async function patpat() {
		const response = await fetch("/api/headpat", {
			method: "POST",
			body: JSON.stringify({
				action: "pat",
				user: data.user,
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
	<Button on:click={patpat} color="purple">Pat!!</Button>
</div>
