<script context="module">
  const AttributeMap = {
    fire: 'bg-fire',
    water: 'bg-water',
    plant: 'bg-plant',
    neutral: 'bg-neutral',
    dark: 'bg-dark',
    light: 'bg-light',
    wind: 'bg-wind',
    earth: 'bg-earth',
    electric: 'bg-electric',
  }
</script>

<script>
  import { crossfade, fade } from 'svelte/transition'
  import Attrib from './Attrib.svelte'

  export let digimon
  export let simple = true
</script>

<div
  class="
    inline-block
    rounded-md
    overflow-hidden
    relative
    z-0
    {AttributeMap[digimon.attribute]}
    {!simple && 'p-1'}
  "
>

  <img
    src="/{digimon.images.icon}"
    alt="{digimon.name}"
    class="{!simple ? 'w-32 h-32' : 'w-24 h-24'} rounded-md overflow-hidden"
  />
  {#if !simple}
  <div class="flex justify-between items-center py-1 px-1">
    <Attrib
      type="{digimon.type}"
      class="w-3 h-3"
    />
    <div class="flex items-center space-x-1">
      {#each [0, 1, 2] as i}
        <div
          class:bg-gray-600="{digimon.equipment_slots > i}"
          class="border border-gray-600 rounded-sm w-3 h-3"
        />
      {/each}
    </div>
    <div
      class="
        w-5
        h-5
        flex
        items-center
        justify-center
        bg-gray-600
        rounded-md
        text-xs
        leading-3
        text-white
        font-semibold
      "
    >
      {digimon.memory_usage}
    </div>
  </div>
  {:else}
  <div
    class="
      text-center
      text-white
      absolute
      inset-x-0
      bottom-0
      bg-gray-600
      opacity-90
      font-sans
      font-semibold
      overflow-ellipsis
      whitespace-nowrap
      overflow-hidden
      text-sm
      px-2
    "
  >
    {digimon.name}
  </div>
  <div class="absolute left-0 top-0 p-1">
    <Attrib
      type="{digimon.type}"
      attribute="{digimon.attribute}"
      class="w-5 h-5"
    />
  </div>
  {/if}
</div>
