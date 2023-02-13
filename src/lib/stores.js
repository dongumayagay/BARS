import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '$lib/firebase/client.js';
import { browser } from '$app/environment';
import { readable, writable } from "svelte/store";

export let adminUser = writable(null);

export let currentPage = writable(0);

export const userStore = readable(undefined, set => {
    const unsubscribe = onAuthStateChanged(
        auth,
        (user) => browser && set(user)
    )
    return () => unsubscribe()
})