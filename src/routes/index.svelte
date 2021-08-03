<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/digimon.json')

    if (!res.ok) return

    return {
      props: {
        digimon: await res.json()
      }
    }
  }
</script>

<script lang="ts">
import { fade } from 'svelte/transition'
import { flip } from 'svelte/animate'
import DigiCard from '../components/DigiCard.svelte'
import Page from '../components/Page.svelte'

export let digimon = []

let search = ''
let filters: Map<string, Set<string>> = new Map();

$: filtered_digimon = digimon.filter((digimon) => {
  if (search && !digimon.name.toLowerCase().includes(search.toLowerCase())) return false

  for (const [key, value] of filters.entries()) {
    if (value.size && !value.has(digimon[key])) return false
  }
  return true
})

</script>
<Page>
  <div slot="header" class="flex-1">
    <div>
      <label for="search" class="sr-only">Search candidates</label>
      <div class="mt-1 flex rounded-md shadow-sm">
        <div class="relative flex items-stretch flex-grow focus-within:z-10">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <!-- Heroicon name: solid/users -->
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
          <input
            type="text"
            name="email"
            id="email"
            bind:value="{search}"
            class="
              focus:ring-indigo-500
              focus:border-indigo-500
              block
              w-full
              rounded-none
              rounded-l-md
              pl-10
              sm:text-sm
              border-gray-300
            "
            placeholder="John Doe"
          >
        </div>
        <button
          class="
            -ml-px
            relative
            inline-flex
            items-center
            space-x-2
            px-4
            py-2
            border
            border-gray-300
            text-sm
            font-medium
            rounded-r-md
            text-gray-700
            bg-gray-50
            hover:bg-gray-100
            focus:outline-none
            focus:ring-1
            focus:ring-indigo-500
            focus:border-indigo-500
          "
        >
          <!-- Heroicon name: solid/sort-ascending
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
          </svg> -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span class="sr-only">Filters</span>
        </button>
      </div>
      <div>
      filters
      </div>
    </div>
  </div>
  <div transition:fade>
    {#each filtered_digimon as digimon (digimon.id)}
    <a class="inline-block m-2 rounded-md" href="/digimon/{digimon.id}" transition:fade>
      <DigiCard digimon="{digimon}"/>
    </a>
    {/each}
  </div>
</Page>
