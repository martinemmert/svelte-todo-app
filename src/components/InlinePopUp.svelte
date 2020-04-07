<script>
  import { createEventDispatcher } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { backOut, backIn, cubicInOut, quartInOut } from "svelte/easing";
  import Calendar from "./Calendar.svelte";

  export let exclude = [];
  let child;

  const dispatch = createEventDispatcher();

  function popUp(node, { duration, out }) {
    return {
      duration,
      css: t => {
        const easing = out ? quartInOut(t) : backOut(t);
        const blur = quartInOut(t);
        return `
          transform-origin: 0 0;
          transform: scale(${easing}) translate(-50%, -50%);
          filter: blur(${2 - blur * 2}px);
          opacity: ${blur};
          `;
      },
    };
  }

  function isExcluded(target) {
    var parent = target;
    while (parent) {
      if (exclude.indexOf(parent) >= 0 || parent === child) {
        return true;
      }
      parent = parent.parentNode;
    }
    return false;
  }

  const clickOutSideHandler = event => {
    if (!isExcluded(event.target)) {
      dispatch("clickoutside");
    }
  };
</script>

<svelte:body on:click="{clickOutSideHandler}" />
<div
  bind:this="{child}"
  class="fixed z-10 p-4 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-100
  rounded-md shadow-lg top-1/2 left-1/2"
  in:popUp="{{ duration: 150 }}"
  out:popUp="{{ duration: 150, out: true }}"
>
  <slot />
</div>
