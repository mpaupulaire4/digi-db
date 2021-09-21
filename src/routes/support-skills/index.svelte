<script lang="ts">
import { scale, slide } from 'svelte/transition'
import { flip } from 'svelte/animate'

import { SupportStore } from '$lib/Data/Database'

import SupportCard from '../../components/SupportCard.svelte'
import Page from '../../components/Page.svelte'
import SearchFilter from '../../components/SearchFilter.svelte'
import ButtonSelect from '../../components/ButtonSelect.svelte'
import VirtualList from '../../components/VirtualList.svelte'
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
      bind:value="{search}"
    />
  </div>
  <div role="list" class="overflow-y-auto h-full">
  <List items="{filtered_skills}" let:item initialRender="{11}">
    <SupportCard support="{item}" />
  </List>
  <!-- {#each filtered_skills as skill}
  {:else}
    no match
  {/each} -->
  </div>
</Page>
