<script>
  import { createEventDispatcher } from "svelte";
  import todos, { PRIORITY } from "./todos.js";
  export let todo;

  function getDateStringFromISODate(dateStr) {
    return dateStr.split("T").shift();
  }

  let showDueDateForm = false;
  let showPrioritySelection = false;
  const minDueDate = getDateStringFromISODate(new Date().toISOString());

  let dueDate = todo.dueDate ? getDateStringFromISODate(todo.dueDate) : undefined;

  $: formattedDueDate =
    todo.dueDate &&
    new Date(todo.dueDate).toLocaleDateString("de-DE", {
      dateStyle: "medium",
    });

  function submitDueDateForm() {
    todos.setDueDate(todo.id, dueDate ? new Date(dueDate).toISOString() : undefined);
    showDueDateForm = false;
  }

  function setPriority(id, priority) {
    todos.setPriority(id, priority);
    showPrioritySelection = false;
  }
</script>

<style>
  .done {
    text-decoration: line-through;
  }
</style>

<li>
  <div>
    <span on:click="{() => todos.toggle(todo.id)}" class:done="{todo.completed}">
      {#if todo.completed}◉{:else}○{/if}
      {todo.text}
    </span>
    <span
      on:click="{() => confirm('Do you really want to delete this item?') && todos.remove(todo.id)}"
    >
      🚫
    </span>
  </div>
  {#if !todo.completed}
    <div>
      {#if showPrioritySelection}
        <span on:click="{() => setPriority(todo.id, PRIORITY.PRIMARY)}">3️⃣</span>
        <span on:click="{() => setPriority(todo.id, PRIORITY.SECONDARY)}">2️⃣</span>
        <span on:click="{() => setPriority(todo.id, PRIORITY.TERTIARY)}">1️⃣</span>
        <span on:click="{() => setPriority(todo.id, PRIORITY.NONE)}">0️⃣</span>
      {:else if todo.priority === PRIORITY.PRIMARY}
        <span on:click="{() => (showPrioritySelection = !showPrioritySelection)}">3️⃣</span>
      {:else if todo.priority === PRIORITY.SECONDARY}
        <span on:click="{() => (showPrioritySelection = !showPrioritySelection)}">2️⃣</span>
      {:else if todo.priority === PRIORITY.TERTIARY}
        <span on:click="{() => (showPrioritySelection = !showPrioritySelection)}">1️⃣</span>
      {:else}
        <span on:click="{() => (showPrioritySelection = !showPrioritySelection)}">0️⃣</span>
      {/if}
      {#if showDueDateForm}
        <form on:submit|preventDefault="{submitDueDateForm}">
          <input type="date" name="date" bind:value="{dueDate}" min="{minDueDate}" />
          <button type="submit">save</button>
        </form>
      {:else}
        <span on:click="{() => (showDueDateForm = !showDueDateForm)}">
          {#if formattedDueDate}📆{formattedDueDate}{:else}🗓{/if}
        </span>
      {/if}
    </div>
  {/if}
</li>
