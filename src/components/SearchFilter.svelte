<script>
  import { createEventDispatcher } from 'svelte'
  import { slide } from 'svelte/transition'

  import ButtonSelect from './ButtonSelect.svelte'

  export let value = ''
  export let placeholder = 'Search'
  export let active = false
  export let clearable = false

  const emit = createEventDispatcher()

  function clear() {
    value = ''
    emit('clear')
  }

</script>
<div>
  <label for="search" class="sr-only">Search candidates</label>
  <div class="mt-1 flex rounded-md shadow-sm">
    <div class="relative flex items-stretch flex-grow focus-within:z-10">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <!-- Heroicon name: solid -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
      </div>
      <input
        bind:value
        type="text"
        name="search"
        id="search"
        class="
          focus:ring-indigo-500
          focus:border-indigo-500
          block
          w-full
          rounded-none
          rounded-l-md
          px-10
          sm:text-sm
          border-gray-300
        "
        placeholder="{placeholder}"
      >
      {#if clearable || value }
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <!-- Heroicon name: solid -->
        <button on:click="{clear}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      {/if}
    </div>
    <button
      on:click="{() => emit('click')}"
      class="
        -ml-px
        relative
        inline-flex
        items-center
        space-x-2
        px-4
        py-2
        border
        border-gray-300
        text-sm
        font-medium
        rounded-r-md
        text-gray-700
        bg-gray-50
        hover:bg-gray-100
        focus:outline-none
        focus:ring-1
        focus:ring-indigo-500
        focus:border-indigo-500
      "
    >
      <!-- Heroicon name: solid -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {active && 'text-blue-700'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
      <span class="sr-only">Filters</span>
    </button>
  </div>
</div>
