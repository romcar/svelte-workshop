<script>
    // SECTION TODO functionality (Store Example)
    import { todos, allTodosComplete } from '../../store/index';
    import { onMount } from 'svelte';

    let newTodo = '...yet';

    onMount(async () => {
        // NOTE SSR part of the app does not know what the hell document is.
        const newTodo = document.querySelector('.add-todo-item')[0];

        let formFields = {
            'todo-item': document.querySelectorAll('[name="todo-item"]')[0],
        }

        document.addEventListener('submit', (e) => {
            e.preventDefault();

            // ANCHOR Store Update Example
            todos.update((t) => {
                const todo = {
                    'item': formFields['todo-item'].value,
                    'completed': false,
                    'dateAdded': new Date()
                };

                // NOTE Update function will use returned value.
                // Given t = [], t.push(todo) --> 1 and later when
                // referenced $todo === 1.
                return t.concat(todo);
            });
        });
    });
    // !SECTION
</script>


<style>

</style>

<svelte:head>
	<title> Todo </title>
</svelte:head>

<div class="center-text">
  {#if $allTodosComplete}
    <h3 class="o-extra-small--24">Nothing to do...</h3>
    <form class="add-todo-item" action="">
      <input class="o-extra-small--24"
             type="text"
             name="todo-item"
             bind:value={newTodo}/>
    </form>
  {/if}

    {#if !$allTodosComplete}
        {#each $todos as todo}
            <div>{}</div>
        {/each}
    {/if}
</div>