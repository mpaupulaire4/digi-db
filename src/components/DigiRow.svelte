<script>
  import TypeSymbol from './TypeSymbol.svelte'
  import Attrib from './Attrib.svelte'


  export let digimon;
  export let conditions = false;

  $: condition_list = conditions && Object.entries(
    digimon.digivolve_condition || {}
  ).filter(
    ([k, v]) => v && k !== 'additional'
  )

</script>

<div
  class="relative z-0 shadow-md bg-gray-700 rounded-xl flex overflow-hidden w-full"
>
  <div class="relative">
    <img
      src="/{digimon.images.icon}"
      alt="{digimon.name}"
      class="w-28 h-28 rounded-xl overflow-hidden m-1 bg-gray-800"
    />
    <div class="absolute top-0 left-0 p-2">
      <Attrib
        type="{digimon.type}"
        attribute="{conditions ? digimon.attribute : 'none'}"
        class="w-5 h-5"
      />
    </div>
  </div>
  <div class="flex-1 p-2 text-gray-100 space-y-2 relative">
    <div class="text-lg font-bold capitalize text-center leading-4" >{digimon.name}</div>
  {#if !conditions}
    <div class="border-gray-100 rounded-full border flex items-center overflow-hidden bg-gray-600">
      <div class="capitalize text-xs flex-1 text-center font-bold tracking-widest">{digimon.stage}</div>
    </div>
    <div class="border-gray-100 rounded-full border flex items-center justify-center overflow-hidden bg-gray-600">
      <img src="/images/types/{digimon.attribute}-icon.png" class="w-4 h-4 mr-1" alt="{digimon.attribute} attribute" />
      <div class="capitalize text-xs text-center font-bold tracking-widest">{digimon.attribute}</div>
    </div>
    <div class="flex text-xs font-bold items-center space-x-2">
      <div class="border-gray-100 border inline-flex rounded-full overflow-hidden bg-gray-600 items-center justify-center space-x-1 py-1 px-3">
      {#each [0, 1, 2] as i}
        <div
          class:bg-gray-100="{digimon.equipment_slots <= i}"
          class="border border-gray-100 rounded-sm w-2 h-2"
        />
      {/each}
      </div>
      <div class="border-gray-100 border inline-flex rounded-full overflow-hidden bg-gray-600 flex-1 items-center">
        <div class="px-3 text-center flex-1"> {digimon.memory_usage} Memory </div>
      </div>
    </div>

  {:else}
    <table class="w-full">
      <thead>
        <tr>
        {#each condition_list as item}
          <th class="text-xs uppercase">{item[0]}</th>
        {/each}
        </tr>
      </thead>
      <tbody>
        <tr>
        {#each condition_list as item}
          <td class="text-sm text-center">{item[1]}</td>
        {/each}
        </tr>
      </tbody>
    </table>
    <div class="border-gray-100 rounded-full border flex items-center overflow-hidden bg-gray-600 leading-3 px-2">
      <div class="text-xs flex-1 text-center font-bold tracking-widest">{digimon.digivolve_condition.additional || 'No Notes'}</div>
    </div>
  {/if}
  </div>
</div>
