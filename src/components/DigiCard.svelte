<script>
  import { crossfade, fade } from 'svelte/transition'
  import Attrib from './Attrib.svelte'

  export let digimon

  const [send, receive] = crossfade({
    duration: 200,
    fallcack: fade
  })
</script>

<div
  in:receive="{{key: digimon.id}}"
  out:send="{{key: digimon.id}}"
  class="
    inline-block
    rounded-md
    overflow-hidden
    relative
    w-32
    h-32
  "
>

  <img src="{digimon.images.icon}" alt="{digimon.name}" class="h-full w-full"/>
  <div
    class="
      text-center
      text-white
      absolute
      inset-x-0
      bottom-0
      bg-gray-600
      opacity-70
      font-sans
      font-semibold
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
</div>
