<script lang="ts">
import { scale, slide } from 'svelte/transition'
import { flip } from 'svelte/animate'

import { SupportStore } from '$lib/Data/Database'

import SupportCard from '../../components/SupportCard.svelte'
import Page from '../../components/Page.svelte'
import SearchFilter from '../../components/SearchFilter.svelte'
import ButtonSelect from '../../components/ButtonSelect.svelte'
import List from '../../components/Virtual.svelte'

let search = ''

const queried_skills = SupportStore.where()

$: filtered_skills = !search ? queried_skills : queried_skills.filter(
  d => d.name.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase())
)

</script>
<Page>
  <div slot="header" class="flex-1">
    <SearchFilter
      filters="{false}"
      bind:value="{search}"
    />
  </div>
  <div role="list" class="overflow-y-auto h-full pt-4">
  {#each filtered_skills as item}
    <div class="pb-2">
      <SupportCard support="{item}" />
    </div>
  {:else}
    no match
  {/each}
  </div>
</Page>
