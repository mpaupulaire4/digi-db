<script>
  import { onMount } from 'svelte';

  export let items;
  export let initialRender = 1
  export let buffer = 20

  let scrollTop = 0;
  let containerHeight = 0;
  let itemHeight = 1;
  let self;


  $: listHeight = items.length * itemHeight
  $: numVisible = Math.ceil(containerHeight / itemHeight) + 2 * buffer
  $: start = Math.max(Math.floor(scrollTop / itemHeight) - buffer, 0)
  $: end = start + numVisible
  $: list = items.slice(start, end)

  $: top = start * itemHeight

  let reqID;
  function poll() {
    if (self?.parentNode?.scrollTop !== scrollTop) {
      scrollTop = self?.parentNode?.scrollTop;
    }

    if (self?.parentNode?.clientHeight !== containerHeight) {
      containerHeight = self?.parentNode?.clientHeight;
    }

    reqID = requestAnimationFrame(poll);
  }

  onMount(() => {
    reqID = requestAnimationFrame(poll);
    containerHeight = self?.parentNode?.clientHeight;
    itemHeight = self?.firstChild?.clientHeight;
    scrollTop = self?.parentNode?.scrollTop;
    return () => {
      cancelAnimationFrame(reqID);
    }
  });
</script>
<ul bind:this="{self}" class="list" style="height: {listHeight}px">
{#if self}
{#each list as item}
  <li class="list-item" style="top: {top}px">
    <slot item="{item}"/>
  </li>
{/each}
{:else}
{#each items.slice(0, initialRender) as item}
  <li class="list-item">
    <slot item="{item}"/>
  </li>
{/each}
{/if}
</ul>


<style>
  .list {
    width: 100%;
    min-height: 100%;
    /* Prevent the translated items from bleeding through, causing more scrolling */
    overflow: hidden;
  }

  .list-item {
    position: relative;
  }
</style>
