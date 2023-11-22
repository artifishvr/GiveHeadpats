<script>
    import { account } from '$lib/appwrite';

    let loggedIn = {};
    loggedIn.status = false;

    const promise = account.get();

    promise.then(
        function (response) {
            loggedIn.status = true;
            loggedIn.user = response.name;
        },
        function (error) {
            loggedIn.status = false;
        }
    );

    let email = '';
    let newpassword = '';
    let currentpassword = '';

    async function updateDetails() {
        if (!currentpassword) {
            return alert('Please enter your current password.');
        }

        if (email) {
            await account.updateEmail(email, currentpassword);
        }

        if (newpassword) {
            await account.updatePassword(newpassword, currentpassword);
        }

        alert('Account details updated!');
    }
</script>

{#if loggedIn.user}
    <main class="flex justify-center items-center h-screen bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md">
            <h1 class="text-2xl font-bold mb-4">Account Management</h1>

            <form class="mb-4">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-bold mb-2">Update Email</label>
                    <input
                        type="email"
                        id="email"
                        bind:value={email}
                        placeholder="Leave blank to keep the same email"
                        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-gray-700 font-bold mb-2">Update Password</label>
                    <input
                        type="password"
                        id="password"
                        bind:value={newpassword}
                        placeholder="Leave blank to keep the same password"
                        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-gray-700 font-bold mb-2">Current Password</label>
                    <input
                        type="password"
                        id="password"
                        bind:value={currentpassword}
                        placeholder="Required"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                </div>

                <div class="mb-4">
                    <p>Changing usernames is only currently possible by contacting <a href="mailto:pats@arti.lol">pats@arti.lol</a>.</p>
                </div>

                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    on:click={updateDetails}>Save Changes</button>
            </form>
        </div>
    </main>
{:else}
    <a href="/account/login">Login</a>
{/if}
