import { writable, derived } from 'svelte/store';
const StoryblokClient = require('storyblok-js-client');

export const storyblok = new StoryblokClient({
    accessToken: '3ffrOl4CB3PcUrpeH1QrDQtt'
});

export const todos = writable([]);

export const allTodosComplete = derived(
    todos,
    $todos => $todos.length === 0
);

