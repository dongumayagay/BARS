import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs} from "firebase/firestore"
import { auth, db } from '$lib/firebase/client.js';
import { browser } from '$app/environment';
import { readable, writable } from "svelte/store";
import { onMount } from 'svelte';

// onMount(async ()=>{
//     const userEmails = await getDocs(collection(db, "adminUsers"))
//     adminUsers = userEmails.docs.map((doc)=>({...doc.data()}))
// })
export let currentPage = writable(0);

export let currentInterface = writable(null)
export const userStore = readable(undefined, set => {
    const unsubscribe = onAuthStateChanged(
        auth,
        (user) => browser && set(user)
    )
    return () => unsubscribe()
})

export let adminUsers = readable([
    {email: "user@sample.com"}
]);




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
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",

]

export const ordinals = [
    "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"
]