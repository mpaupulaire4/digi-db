<script lang="ts">
import { scale, slide } from 'svelte/transition'
import { flip } from 'svelte/animate'
import DigiCard from '../components/DigiCard.svelte'
import Page from '../components/Page.svelte'
import SearchFilter from '../components/SearchFilter.svelte'
import ButtonSelect from '../components/ButtonSelect.svelte'
import { DigimonStore } from '../lib/Data/Database'

let digimon = []
let open = false

let search = ''

let type_filter: Set<string> = new Set();
let attribute_filter: Set<string> = new Set();
let stage_filter: Set<string> = new Set();

$: query = get_query(attribute_filter, type_filter, stage_filter)

function get_query(attribute_filter, type_filter, stage_filter) {
  if (
      !attribute_filter.size
      && !type_filter.size
      && !stage_filter.size
  ) return undefined
  const filters = {}
  if (attribute_filter.size) {
    filters.attribute = {
      "$in": attribute_filter
    }
  }

  if (type_filter.size) {
    filters.type = {
      "$in": type_filter
    }
  }

  if (stage_filter.size) {
    filters.stage = {
      "$in": stage_filter
    }
  }

  return filters
}

$: queried_digimon = DigimonStore.where(query)
$: filtered_digimon = !search ? queried_digimon : queried_digimon.filter(
  d => d.name.toLowerCase().includes(search.toLowerCase())
)


function clear() {
  attribute_filter.clear()
  type_filter.clear()
  stage_filter.clear()
  attribute_filter = attribute_filter
  type_filter = type_filter
  stage_filter = stage_filter
}

</script>
<Page>
  <div slot="header" class="flex-1">
    <SearchFilter
      bind:value="{search}"
      on:click="{() => open = !open }"
      on:clear="{clear}"
      clearable="{!!query}"
      active="{!!query}"
    />
    {#if open}
    <ul transition:slide>
      <li class="py-2">
        <div class="capitalize mb-2 text-sm">Stage</div>
        <ButtonSelect
          options="{[
            'Training 1',
            'Training 2',
            'Rookie',
            'Champion',
            'Ultimate',
            'Mega',
          ]}"
          bind:value="{stage_filter}"
        />
      </li>
      <li class="py-2">
        <div class="capitalize mb-2 text-sm">Type</div>
        <ButtonSelect
          options="{['free', 'data', 'virus', 'vaccine']}"
          bind:value="{type_filter}"
        />
      </li>
      <li class="py-2">
        <div class="capitalize mb-2 text-sm">Attribute</div>
        <ButtonSelect
          bind:value="{attribute_filter}"
          options="{[
            'neutral',
            'light',
            'dark',
          ]}"
        />
        <ButtonSelect
          bind:value="{attribute_filter}"
          options="{[
            'fire',
            'water',
            'plant',
          ]}"
        />
        <ButtonSelect
          bind:value="{attribute_filter}"
          options="{[
            'electric',
            'wind',
            'earth',
          ]}"
        />
      </li>
    </ul>
    {/if}
  </div>
  <div>
    {#each filtered_digimon as digimon}
    <a
      class="inline-block m-2 rounded-md"
      href="/digimon/{digimon.id}"
      transition:scale
    >
      <DigiCard digimon="{digimon}"/>
    </a>
    {/each}
  </div>
</Page>
