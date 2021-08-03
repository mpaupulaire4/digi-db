<script>
import { page } from "$app/stores";
import { slide } from 'svelte/transition';
import cx from 'classnames'

let menuOpen = false

const links = [
  {
    href: '/',
    label: 'Digimon'
  },
  {
    href: '/skills',
    label: 'Skills'
  },
  {
    href: '/support-skills',
    label: 'Support Skills'
  },
]

</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="h-full flex flex-col">
  <nav class="bg-gray-800 shadow z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="space-x-4 hidden md:flex items-center">
          <!-- Currefnt: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          {#each links as link}
          <a
            href="{link.href}"
            class="px-3 py-2 rounded-md text-sm font-medium {cx({
              "text-gray-300 hover:bg-gray-700 hover:text-white": $page.path !== link.href,
              "bg-gray-900 text-white": $page.path === link.href
            })}"
          >
            {link.label}
          </a>
          {/each}
        </div>

        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button
            on:click="{() => menuOpen = !menuOpen}"
            type="button"
            class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="{menuOpen ? 'hidden' : 'block'} h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="{!menuOpen ? 'hidden' : 'block'} h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    {#if menuOpen}
    <div transition:slide class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        {#each links as link}
        <a
          on:click="{() => menuOpen = false}"
          href="{link.href}"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium {cx({
            "bg-gray-900 text-white": $page.path === link.href
          })}"
        >
          {link.label}
        </a>
        {/each}
      </div>
    </div>
    {/if}
  </nav>

  <slot></slot>
</div>

<style global>
@tailwind base;
@tailwind components;
@tailwind utilities;
#svelte {
  height: 100vh;
}
</style>
