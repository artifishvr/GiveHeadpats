<script>
    import { account } from "$lib/appwrite";
    import { onMount } from "svelte";

    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const secret = urlParams.get("secret");
        const userId = urlParams.get("userId");

        const promise = account.updateVerification(userId, secret);

        promise.then(
            function (response) {
                console.log(response);
            },
            function (error) {
                console.log(error);
            }
        );
    });
</script>
<h1>Account Verified?</h1>