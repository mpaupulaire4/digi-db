{#if $$slots.header}
<header class="bg-white shadow z-10">
  <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex">
    <slot name="header"/>
  </div>
</header>
{/if}
<main class="overflow-y-auto bg-gray-200 h-full">
  <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <slot></slot>
  </div>
</main>
