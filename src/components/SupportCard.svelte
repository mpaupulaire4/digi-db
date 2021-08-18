<script>
  export let support;
</script>

<div
  class="shadow-md bg-white rounded-md p-4"
>
  <div class="flex justify-between font-semibold">
    <span>{support.name}</span>
    <span class="font-mono">#{support.id}</span>
  </div>
  <p class="text-gray-800 mt-1 text-sm font-medium">{support.description}</p>
</div>
