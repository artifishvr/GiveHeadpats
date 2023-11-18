<script>
    export let data;

    let headpats = data.headpats;


    async function patpat() {
		const response = await fetch('/api/headpat', {
			method: 'POST',
			body: JSON.stringify({
				"action": "pat",
				"user": data.user
			}),
			headers: {
				'content-type': 'application/json'
			}
		});

		headpats = await response.json();
	}
</script>

<h1>{data.user}</h1>
<h2>{headpats}</h2>

<button on:click={patpat}>Pat</button>
