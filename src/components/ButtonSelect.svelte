<script>
export let options = []
export let value = new Set()

function select(option) {
  if (value.has(option)) {
    value.delete(option)
    value = value
  } else {
    value = value.add(option)
  }
}
</script>

<span class="relative z-0 inline-flex shadow-xs rounded-md">
  {#each options as option}
  <button
    on:click="{() => select(option)}"
    type="button"
    class="
      {value.has(option) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}
      capitalize
      relative
      inline-flex
      items-center
      px-4
      py-2
      first:rounded-l-md
      last:rounded-r-md
      border
      border-gray-300
      hover:
      hover:
      text-sm
      font-medium
      focus:z-10
      focus:outline-none
      focus:ring-1
      focus:ring-indigo-500
      focus:border-indigo-500
    "
  >
    <slot item="{option}">{option}</slot>
  </button>
  {/each}
</span>
