<script>
    import { account } from '$lib/appwrite';

    let email = '';

    async function resetPassword() {
        await account.createRecovery(email, 'https://pat.arti.lol/account/forgot/verify');
    }
</script>

<form class="mb-4">
    <div class="mb-4">
        <label for="password" class="block text-gray-700 font-bold mb-2">Account Email</label>
        <input
            type="email"
            id="email"
            bind:value={email}
            placeholder="Required"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
    </div>

    <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        on:click={resetPassword}>Reset Password</button>
</form>
