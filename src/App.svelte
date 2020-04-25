<script>
  import { setContext } from "svelte";
  import TasksView from "~views/TasksView";
  import MainMachine from "~fsm/machines/Main";
  import useMachine from "~fsm/useMachine";

  const [currentState, send, service] = useMachine(MainMachine, { devTools: true });
  setContext("fsm/parentService", service);
</script>

<TasksView />
