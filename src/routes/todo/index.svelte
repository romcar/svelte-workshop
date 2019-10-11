<script>
    // SECTION TODO functionality (Store Example)
    import { todos, allTodosComplete } from '../../store/index';
    import { onMount } from 'svelte';

    let newTodo = '';
    let falseEntryAttempts = 0;

    export function validateSubmission(todo) {
        if(!todo) {
            ++falseEntryAttempts;

            if(falseEntryAttempts === 5) {
                falseEntryAttempts = 0;
                alert('Yo for real, gimme something to do!');
            }
            return false;
        }
        return true;
    };

    onMount(async () => {
        // NOTE SSR part of the app does not know what the hell document is.
        const newTodo = document.querySelector('.add-todo-item')[0];

        let formFields = {
            'new-todo-item': document.querySelectorAll('[name="new-todo-item"]')[0],
        }

        newTodo.addEventListener('click', (e) => {
            e.preventDefault();
            if(e.target.value) {
                e.target.value = '';
            }
        });

        document.addEventListener('submit', (e) => {
            e.preventDefault();

            const isValid = validateSubmission(formFields['new-todo-item'].value);

            if(!isValid){
                return false;
            }
            // ANCHOR Store Update Example
            todos.update((t) => {
                const todo = {
                    'item': formFields['new-todo-item'].value,
                    'completed': false,
                    'dateAdded': new Date()
                };

                // NOTE Update function will use returned value.
                // Given t = [], t.push(todo) --> 1 and later when
                // referenced $todo === 1.
                return t.concat(todo);
            });

            // ANCHOR POST example...
            fetch('/api/db/todos', {
                method: 'POST',
                body: JSON.stringify($todos),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch((e) => console.error);

            newTodo.value = ''
            newTodo.placeholder = 'GIVE ME MOAR 🦁'
        });
    });
    // !SECTION
</script>

<script context="module">
	export async function preload({ params, query }) {
        // NOTE We can only use this.fetch inside of this preload function.
        return await this.fetch('/api/db/todos', {
            method: 'GET'
        }).then(r => r.json())
        .then( todoData => {
            todos.set(todoData);
        });
    }
</script>

<style lang="scss">
.c-todo__text {
    font-size: 1.5rem;
}
</style>

<svelte:head>
	<title> Todo List </title>
</svelte:head>

{#if $allTodosComplete}
    <h3 class="o-extra-small--24 center-text">Nothing to do...</h3>
{/if}

{#if !$allTodosComplete}
    {#each $todos as todo}
        <div class="o-extra-small--24 center-text js-todo">
            <p class="c-todo__text">{todo.item}</p>
        </div>
    {/each}
{/if}

<form class="add-todo-item" action="">
    <input class="o-extra-small--24 center-text"
        type="text"
        name="new-todo-item"
        bind:value={newTodo}
        placeholder='Press enter to submit'/>
</form>
