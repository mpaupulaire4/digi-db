<script lang="ts">
import { scale, slide } from 'svelte/transition'
import { flip } from 'svelte/animate'
import DigiCard from '../components/DigiCard.svelte'
import Page from '../components/Page.svelte'
import SearchFilter from '../components/SearchFilter.svelte'
import ButtonSelect from '../components/ButtonSelect.svelte'
import Database from '../lib/Data/Database'

let digimon = []
let open = false

Database.open().then(async () => {
  await Database.digimon.orderBy('id').toArray().then((data) => {
    digimon = data
  })
})

let search = ''

let type_filter: Set<string> = new Set();
let attribute_filter: Set<string> = new Set();
let stage_filter: Set<string> = new Set();

$: has_filters = attribute_filter.size || type_filter.size || stage_filter.size
$: filtered_digimon = has_filters ? digimon.filter((digimon) => {
  if (search && !digimon.name.toLowerCase().includes(search.toLowerCase())) return false

  if (attribute_filter.size && !attribute_filter.has(digimon.attribute)) return false
  if (type_filter.size && !type_filter.has(digimon.type)) return false
  if (stage_filter.size && !stage_filter.has(digimon.stage)) return false
  return true
}) : digimon


function clear() {
  attribute_filter.clear()
  attribute_filter = attribute_filter
  type_filter.clear()
  type_filter = type_filter
  stage_filter.clear()
  stage_filter = stage_filter
}

</script>
<Page>
  <div slot="header" class="flex-1">
    <SearchFilter
      bind:value="{search}"
      on:click="{() => open = !open }"
      on:clear="{clear}"
      clearable="{has_filters}"
      active="{has_filters}"
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
    {#each filtered_digimon as digimon (digimon.id)}
    <a class="inline-block m-2 rounded-md" href="/digimon/{digimon.id}" animate:flip="{{ duration: 200 }}" transition:scale>
      <DigiCard digimon="{digimon}"/>
    </a>
    {/each}
  </div>
</Page>
