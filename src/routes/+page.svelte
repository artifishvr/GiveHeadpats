<script>
    let mostpatted = [];
</script>

<h1 class="mb-10">Give Headpats</h1>

<h2>Most Headpatted</h2>
<div class="grid grid-cols-4 gap-4">
    {#each mostpatted as user}
        <div class="bg-gray-200 p-4">
            <h2>{user.name}</h2>
            <p>Age: {user.age}</p>
        </div>
    {/each}
</div>
