<script>
    import { Fileupload, Label, Button } from 'flowbite-svelte';
    import { storage } from '$lib/appwrite';
    import { ID } from 'appwrite';
    import { PUBLIC_PFP_BUCKET_ID } from '$env/static/public';

    async function upload() {
        const promise = storage.createFile(PUBLIC_PFP_BUCKET_ID, ID.unique(), document.getElementById('uploader').files[0]);

        promise.then(
            function (response) {
                console.log(response); // Success
            },
            function (error) {
                alert(error.message);
                console.log(error); // Failure
            },
        );
    }
</script>

<Label class="space-y-2 mb-2">
    <span>Profile Picture</span>
    <Fileupload id="uploader" />
</Label>
<Button color="dark" on:click={upload}>Update</Button>
