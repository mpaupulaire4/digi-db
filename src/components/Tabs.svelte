<script>
  export let tabs = []
  export let value = tabs[0]
  let classname = '';

  export {
    classname as class
  }
</script>


<div class="flex items-center justify-center {classname}">
  <nav class="flex space-x-4" aria-label="Tabs">
    <!-- Current: "bg-indigo-100 text-indigo-700", Default: "text-gray-500 hover:text-gray-700" -->
    {#each tabs as tab}
    <a
      href="#{tab.toLowerCase()}"
      on:click="{() => value = tab}"
      class="{tab !== value ? 'text-gray-500 hover:text-gray-700' : 'bg-indigo-100 text-indigo-700'} px-3 py-2 font-medium text-sm rounded-md"
    >
      {tab}
    </a>
    {/each}
  </nav>
</div>
