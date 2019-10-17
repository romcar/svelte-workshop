<script>
    // SECTION TODO functionality (Store Example)
    import { todos, allTodosComplete } from '../../store/index';
    import { onMount } from 'svelte';
    import uuid from 'uuidv4';
    import { formatQS } from '../../js/urlUtils';
    import { fly } from 'svelte/transition';

    onMount(async () => {
        // NOTE SSR part of the app does not know what the hell document is.
        newTodoElement = document.querySelector('.add-todo-item')[0];
        todoElements = document.querySelectorAll('.js-todo');

        formFields['new-todo-item'] = document.querySelectorAll('[name="new-todo-item"]')[0];
    });

    let newTodo = '';
    let newTodoElement;
    let todoElements = [];
    let falseEntryAttempts = 0;
    let formFields = {};
    let showCompleted = false;

    function getCompletedTodos() {
        showCompleted = true;
        const params = {
            getCompleted: true
        }
        const url = `/api/db/todos?${formatQS(params)}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(completedTodos => {
            todos.update(t => {
                return Object.assign({}, t, completedTodos)
            });
        })
    }

    function deleteCompletedTodos() {

        fetch('/api/db/todos', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(completedTodos => {
            debugger;
        })
        .catch(err => console.err(err));
    }

    function submitTodo(e) {
        const isValid = validateSubmission(formFields['new-todo-item'].value);

        if(!isValid){
            return false;
        }

        const todo = {};
        // ANCHOR Store Update Example
        todos.update((t) => {
            todo.item = formFields['new-todo-item'].value;
            todo.completed = false;
            todo.dateAdded =  new Date();
            todo.id = uuid();

            // NOTE Update function will use returned value.
            // Given t = [], t.push(todo) --> 1 and later when
            // referenced $todo === 1.
            return Object.assign({}, t, { [todo.id]: todo })
        });

        // ANCHOR POST example...
        fetch('/api/db/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch((err) => console.error(err));

        newTodoElement.value = ''
        newTodoElement.placeholder = 'that\'s it, that\'s what I\'m looking for!';
    }

    function toggleCompleted(id) {
        $todos[id].completed = !$todos[id].completed;
        return $todos[id];
    }

    function updateTodo(todo) {

        fetch('/api/db/todos',{
            method: 'PUT',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch((err) => console.error(err));
    }

    function validateSubmission(todo) {
        if(!todo) {
            ++falseEntryAttempts;

            if(falseEntryAttempts === 5) {
                falseEntryAttempts = 0;
                alert('Yo for real, gimme something 😩!');
            }
            return false;
        }
        return true;
    };
    // !SECTION
</script>

<script context="module">
    export async function preload(page, session) {

        // ANCHOR  We can only use this.fetch inside of this preload function.
        return await this.fetch('/api/db/todos', {
            method: 'GET'
        }).then(r => r.json())
        .then( todoData => {
            todos.set(todoData);
        });
    }
</script>

<style lang="scss" global>
@import './src/style/index.scss';
.c-todo__text {
    font-size: 1.5rem;
}

.completed {
    font-size: 1.3rem;
    color: #c125;
}

.delete-completed {
    @include button-base($vivid-tangerine, $padding: $spacer);
    float: right;
    margin: $spacer-2 $spacer 0 0;
}

.show-completed {
    margin: $spacer-2 $spacer 0 0;
}

.add-todo-item {
    margin-top: $spacer-4;
}
</style>

<svelte:head>
    <title> Todo List </title>
</svelte:head>

{#if $allTodosComplete}

    <h3 class="o-extra-small--24 center-text">
        Nothing to do...
    </h3>
{/if}

{#if !$allTodosComplete}
    <!-- ANCHOR Each loop example with key -->
    {#each Object.keys($todos) as todo (todo)}

        <div class="o-extra-small--24 center-text">

                <!-- ANCHOR If conditional example -->
                {#if !$todos[todo].completed }
                    <p class="c-todo__text js-todo completed={$todos[todo].completed}"
                        in:fly|local="{{x: 200, duration: 400}}"
                        out:fly|local="{{x: -200, duration: 400}}"
                        data-id={todo}
                        on:click={() => { updateTodo(toggleCompleted(todo)); }}>
                        {$todos[todo].item}
                    </p>
                {:else if showCompleted && $todos[todo].completed}
                    <p class="c-todo__text js-todo completed"
                        in:fly|local="{{x: 200, duration: 400}}"
                        out:fly|local="{{x: -200, duration: 400}}"
                        data-id={todo}
                        on:click={() => { updateTodo(toggleCompleted(todo)); }}>
                        {$todos[todo].item}
                    </p>
                {/if}
        </div>
    {/each}
{/if}

<form class="add-todo-item"
    action=""
    on:submit|preventDefault={submitTodo}>

    <input class="o-extra-small--24 center-text"
        type="text"
        name="new-todo-item"
        bind:value={newTodo}
        placeholder='Press enter to submit'/>
</form>

<button class="primary show-completed" on:click={getCompletedTodos}>
    Show Completed
</button>

<button class="delete-completed" on:click={deleteCompletedTodos}>
    Delete Completed
</button>
