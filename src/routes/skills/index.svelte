<script lang="ts">
import { scale, slide } from 'svelte/transition'
import { flip } from 'svelte/animate'
import SkillCard from '../../components/SkillCard.svelte'
import Page from '../../components/Page.svelte'
import SearchFilter from '../../components/SearchFilter.svelte'
import ButtonSelect from '../../components/ButtonSelect.svelte'
import { SkillStore } from '$lib/Data/Database'

let open = false

let search = ''

let type_filter: Set<string> = new Set();
let attribute_filter: Set<string> = new Set();

$: query = get_query(attribute_filter, type_filter)

function get_query(attribute_filter, type_filter) {
  if (
      !attribute_filter.size
      && !type_filter.size
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

  return filters
}

$: queried_skills = SkillStore.where(query)
$: filtered_skills = !search ? queried_skills : queried_skills.filter(
  d => d.name.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase())
)


function clear() {
  attribute_filter.clear()
  type_filter.clear()
  attribute_filter = attribute_filter
  type_filter = type_filter
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
        <div class="capitalize mb-2 text-sm">Type</div>
        <ButtonSelect
          options="{['support', 'physical', 'magic']}"
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
    <div role="list" class="space-y-2">
    {#each filtered_skills as skill}
      <SkillCard skill="{skill}"/>
    {/each}
    </div>
  </div>
</Page>
