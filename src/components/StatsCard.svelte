<script>
  import { max_stats } from '$lib/Data/Database'

  export let stats;

  let stat_type = 0;

  const max = max_stats
  const stat_types = [
    'Base',
    'Level 50',
    'Level 99',
  ]

</script>


<div class="overflow-hidden px-6 pb-6 pt-4 bg-white rounded-md shadow-md">
  <div class="flex items-center justify-center py-2">
    <nav class="flex space-x-4" aria-label="Tabs">
      <!-- Current: "bg-indigo-100 text-indigo-700", Default: "text-gray-500 hover:text-gray-700" -->
      {#each stat_types as type, i}
      <button
        class="{i !== stat_type ? 'text-gray-500 hover:text-gray-700' : 'bg-indigo-100 text-indigo-700'} px-3 py-2 font-medium text-sm rounded-md"
        on:click="{() => { stat_type = i}}"
      >
        {type}
      </button>
      {/each}
    </nav>
  </div>
  {#each ['hp', 'sp', 'atk', 'int', 'def', 'spd', 'total'] as stat}
  <div class="border-4 border-white flex bg-gray-500 rounded-lg overflow-hidden">
    <span class="uppercase flex w-16 text-sm font-semibold bg-gray-500 text-white tracking-tight items-center justify-center">{stat}</span>
    <div
      style
      class="
        flex
        overflow-hidden
        text-sm
        w-full
        text-gray-100
        font-extrabold
        font-mono
      "
    >
      <span
        style="width: {Math.round(stats[stat][stat_type] * 100 / max[stat])}%;"
        class="bg-gray-700 inline-block h-full rounded-r-md transition-width duration-500"
      />
      <div class="flex-1 mr-2 text-right">{stats[stat][stat_type]}</div>
    </div>
  </div>
  {/each}
</div>
