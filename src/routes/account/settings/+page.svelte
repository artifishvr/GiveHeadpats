<script>
    import { Heading, P, Fileupload, Label, Button } from 'flowbite-svelte';
    import { storage, account } from '$lib/appwrite';
    import { ID } from 'appwrite';
    import { PUBLIC_PFP_BUCKET_ID } from '$env/static/public';

    async function upload() {
        const loggedin = await account.get();

        const promise = storage.createFile(PUBLIC_PFP_BUCKET_ID, ID.unique(), document.getElementById('uploader').files[0]);

        promise.then(
            async function (response) {
                await fetch('/api/updatepfp', {
                    method: 'POST',
                    body: JSON.stringify({
                        userid: loggedin.$id,
                        pfpid: response.$id,
                    }),
                    headers: {
                        'content-type': 'application/json',
                    },
                });
            },
            function (error) {
                alert(error.message);
                console.log(error); // Failure
            },
        );
    }
</script>

<div class="flex justify-center items-center">
    <div class="bg-white dark:bg-slate-900 rounded-lg p-6 max-w-lg sm:min-w-[50%] min-w-[90%]">
        <Heading tag="h1" class="mb-4" customSize="text-2xl font-bold  md:text-3xl lg:text-4xl">User Settings</Heading>
        <P class="text-gray-500 dark:text-gray-400 pb-12">Work in progress.</P>

        <Label class="space-y-2 mb-2">
            <span>Profile Picture</span>
            <Fileupload id="uploader" />
        </Label>
        <Button color="dark" on:click={upload}>Update</Button>
    </div>
</div>
