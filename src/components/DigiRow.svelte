<script>
  export let digimon;
</script>

<div
  class="relative z-0 shadow-md bg-gray-700 rounded-xl flex overflow-hidden w-full"
>
  <div class="flex-1 p-2 px-4 text-gray-100">
      <!-- <span class="font-mono font-medium capitalize text-sm mr-2">#{digimon.id.toString().padStart(3, '0')}</span> -->
    <span class="text-lg leading-6 font-bold capitalize tracking-wide" >{digimon.name}</span>
      <!-- <span class="font-mono font-medium capitalize text-sm ml-2">{digimon.stage}</span> -->
      <br/><span class="font-mono font-medium capitalize text-sm">#{digimon.id.toString().padStart(3, '0')} - {digimon.stage}</span>

      <br/>
      <span>{digimon.type}</span>
    <span>{digimon.attribute}</span>
  </div>
  <div class="bg-gray-500 p-2  rounded-l-xl">
    <img
      src="/{digimon.images.icon}"
      alt="{digimon.name}"
      class="w-18 h-18 rounded-xl overflow-hidden"
    />
  </div>
</div>
