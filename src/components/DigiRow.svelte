<script>
  import TypeSymbol from './TypeSymbol.svelte'

  export let digimon;

  console.log(digimon.images);
</script>

<div
  class="relative z-0 shadow-md bg-gray-700 rounded-xl flex overflow-hidden w-full"
>
  <div class="flex-1 p-2 text-gray-100 space-y-2">
    <div class="text-lg font-bold capitalize text-center" >{digimon.name}</div>

    <div class="border-gray-100 rounded-full border-2 flex flex-1 items-center overflow-hidden">
      <div class="bg-gray-100 h-full flex items-center justify-center px-2 rounded-full overflow-hidden">
        <TypeSymbol type="{digimon.type}" class="w-4 h-4 text-gray-800" />
        <span class="sr-only">{digimon.type} type</span>
      </div>
      <div class="capitalize text-xs flex-1 text-center font-bold tracking-widest">{digimon.stage}</div>
      <div class="bg-gray-100 h-full flex items-center justify-center px-2 rounded-full">
        <img src="/images/types/{digimon.attribute}-icon.png" class="w-4 h-4" alt="{digimon.attribute} attribute" />
      </div>
    </div>
  </div>
  <div class="bg-gray-500 p-2 rounded-l-xl">
    <img
      src="/{digimon.images.icon}"
      alt="{digimon.name}"
      class="w-18 h-18 rounded-xl overflow-hidden"
    />
  </div>
</div>
