<script lang="ts">
import { scale, slide } from 'svelte/transition'
import { flip } from 'svelte/animate'
import SupportCard from '../../components/SupportCard.svelte'
import Page from '../../components/Page.svelte'
import SearchFilter from '../../components/SearchFilter.svelte'
import ButtonSelect from '../../components/ButtonSelect.svelte'
import { SupportStore } from '$lib/Data/Database'

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
  <div>
    <div role="list" class="mt-1 grid grid-cols-1 gap-5 sm:gap-6">
    {#each filtered_skills as skill}
      <SupportCard support="{skill}"/>
    {:else}
    no match
    {/each}
    </div>
  </div>
</Page>
