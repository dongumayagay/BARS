import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '$lib/firebase/client.js';
import { browser } from '$app/environment';
import { readable, writable } from "svelte/store";

export let currentPage = writable(0);

export let currentInterface = writable(null)
export const userStore = readable(undefined, set => {
    const unsubscribe = onAuthStateChanged(
        auth,
        (user) => browser && set(user)
    )
    return () => unsubscribe()
})


export const months = [
    "January", 
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

export const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",

]