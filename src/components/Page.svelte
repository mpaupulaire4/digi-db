{#if $$slots.header}
<header class="bg-white shadow z-10">
  <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex">
    <slot name="header"/>
  </div>
</header>
{/if}
<main class="overflow-y-auto bg-gray-200 flex-1">
  <div class="max-w-7xl mx-auto pt-4 px-4 sm:px-6 lg:px-8 h-full w-full">
    <slot></slot>
  </div>
</main>
