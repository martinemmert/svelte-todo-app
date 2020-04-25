<script>
  import { getContext, setContext } from "svelte";
  import { interpret } from "xstate";
  import { derived } from "svelte/store";
  import * as todoUtils from "~utils/todo-utilities.js";
  import todos from "~stores/todos.js";
  import { sortOrder, displayCompletedItems } from "~stores/filterOptions.js";
  import TablerIcon from "~components/TablerIcon";

  import NavBar from "~components/NavBar";
  import TaskList from "~components/TaskList";

  import TaskCollectionMachine, { CONSTANTS } from "~fsm/machines/TaskCollection";
  import useMachine from "~fsm/useMachine";

  let orderFunction = todoUtils.orderAscendingByCreationDate;

  sortOrder.subscribe(val => {
    switch (val) {
      case "dueDateAscending":
        orderFunction = todoUtils.orderAscendingByDueDate;
        break;
      case "dueDateDescending":
        orderFunction = todoUtils.orderDescendingByDueDate;
        break;
      case "priorityDescending":
        orderFunction = todoUtils.orderDescendingByPriority;
        break;
      default:
        orderFunction = todoUtils.orderAscendingByCreationDate;
        break;
    }
  });

  const parentService = getContext("fsm/parentService");
  const [currentState, send, service] = useMachine(TaskCollectionMachine, {
    parent: parentService,
  });

  const tasks = derived(currentState, $currentState => Object.values($currentState.context.tasks));
  const newTask = derived(currentState, $currentState => Object.values($currentState.context.newTask));

  setContext("fsm/parentService", service);
</script>

<main>
  <NavBar />
  <div class="max-w-3xl px-8 mx-auto mt-6 md:my-12">
    <TaskList tasks="{$tasks}" />
    {#if !$currentState.matches(CONSTANTS.STATE_MATCHER_ADDING_NEW_TASK)}
      <button
        class="flex items-center mt-6 text-gray-600 ml-14"
        on:click="{() => send(CONSTANTS.EVENT_ADD_NEW_TASK)}"
      >
        <TablerIcon iconName="circle-plus" class="w-6 h-6" />
        <span class="relative ml-2 font-sans leading-none uppercase text-small">Add new task</span>
      </button>
    {/if}
  </div>
  <!-- <div>
    <label>
      <span>Show completed Items:</span>
      <input type="checkbox" bind:checked="{$displayCompletedItems}" />
    </label>
    <fieldset>
      <label>
        <input type="radio" bind:group="{$sortOrder}" value="creationDate" />
        Creation Date 🔼
      </label>
      <label>
        <input type="radio" bind:group="{$sortOrder}" value="dueDateAscending" />
        Due Date 🔼
      </label>
      <label>
        <input type="radio" bind:group="{$sortOrder}" value="dueDateDescending" />
        Due Date 🔽
      </label>
      <label>
        <input type="radio" bind:group="{$sortOrder}" value="priorityDescending" />
        Priority 🔽
      </label>
    </fieldset>
  </div> -->
</main>
