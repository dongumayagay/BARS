import { writable } from "svelte/store";

export let adminUser = writable(null);

export let currentPage = writable(0);