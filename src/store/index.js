import { writable, derived } from 'svelte/store';
const StoryblokClient = require('storyblok-js-client');

export const storyblok = new StoryblokClient({
    accessToken: '0PGiRSfd72tnby8x612yTgtt'
});

export const todos = writable([]);

export const allTodosComplete = derived(
    todos,
    $todos => $todos.length === 0
);

