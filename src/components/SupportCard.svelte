<script>
  export let support;
  export let inner = false
</script>

<div
  class="{inner ? 'shadow-inner' : 'shadow-md'} bg-white rounded-md px-4 py-2 space-y-1"
>
  <div class="font-semibold text-center">
    {support.name}
  </div>
  <p class="text-gray-800 text-sm font-medium text-center">{support.description}</p>
</div>
