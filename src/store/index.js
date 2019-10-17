import { writable, derived } from 'svelte/store';
const StoryblokClient = require('storyblok-js-client');

export const storyblok = new StoryblokClient({
    accessToken: '0PGiRSfd72tnby8x612yTgtt'
});

export const todos = writable({});
export const dancers = writable([]);

export const dancerCount = derived(
    dancers,
    $dancers => $dancers.length
);

export const allTodosComplete = derived(
    todos,
    $todos => Object.keys($todos).length === 0
);


