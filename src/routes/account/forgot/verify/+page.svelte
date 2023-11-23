<script>
    import { account } from '$lib/appwrite';
    import { onMount } from 'svelte';

    let email = '';

    async function resetPassword() {
        await account.createRecovery(email, 'https://pat.arti.lol/account/confirmreset');
    }

    let userId = '';
    let secret = '';
    let expire = '';

    let newpassword = '';
    let confirmpassword = '';

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        userId = params.get('userId');
        secret = params.get('secret');
        expire = params.get('expire');

        if (new Date().getTime() > expire) {
            alert('This link has expired. Please request a new one.');
            window.location.href = 'https://pat.arti.lol/account/forgot';
        }
    });

    async function confirmReset() {
        if (newpassword !== confirmpassword) {
            return alert('Passwords do not match.');
        }

        await account.updateRecovery(userId, secret, newpassword, confirmpassword);
        alert('Password reset successfully!');
        window.location.href = 'https://pat.arti.lol/account/login';
    }
</script>

<main class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md">
        <h1 class="text-2xl font-bold mb-4">Reset Password</h1>

        <form class="mb-4">
            <div class="mb-4">
                <label for="password" class="block text-gray-700 font-bold mb-2">New Password</label>
                <input
                    type="password"
                    id="password"
                    bind:value={newpassword}
                    placeholder="Required"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
            </div>

            <div class="mb-4">
                <label for="confirmpassword" class="block text-gray-700 font-bold mb-2">Confirm Password</label>
                <input
                    type="password"
                    id="confirmpassword"
                    bind:value={confirmpassword}
                    placeholder="Required"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
            </div>

            <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                on:click={confirmReset}>Reset Password</button>
        </form>
    </div>
</main>
