<script lang="ts">
import { fade } from 'svelte/transition'
import { getContext } from 'svelte'
import { page } from '$app/stores';
import DigiCard from '../../components/DigiCard.svelte'
import Page from '../../components/Page.svelte'
import StatsCard from '../../components/StatsCard.svelte'
import SupportCard from '../../components/SupportCard.svelte'
import DigiRow from '../../components/DigiRow.svelte'
import SkillCard from '../../components/SkillCard.svelte'
import Tabs from '../../components/Tabs.svelte'
import { DigimonStore, SkillStore, SupportStore } from '$lib/Data/Database'

let id = parseInt($page.params.id);
let tab = 'Details'

const title = getContext('title')

$: digimon = DigimonStore.get(id)

$: skills = digimon.learns.map(({ move_id }) => {
  return SkillStore.get(move_id)
})

$: digivolve_to = digimon.digivolve_to.map((id) => {
  return DigimonStore.get(id)
})

$: digivolve_from = DigimonStore.where({
  digivolve_to: digimon.id
})

$: support = SupportStore.get(digimon.support_id)

$: title.set(`${digimon.name} - #${digimon.id.toString().padStart(3, '0')}`)


</script>
<svelte:head>
  <title>{digimon.name}</title>
</svelte:head>
<Page>
  <div
    slot="header"
    class="flex-1"
  >
    <DigiRow digimon="{digimon}"/>
    <Tabs tabs="{['Skills', 'Details', 'Evolution']}" class="mt-2 -mb-2" bind:value="{tab}"/>
  </div>
{#if tab === 'Details'}
  <div class="space-y-4">
    <div
      class="bg-white rounded-md p-4 shadow-inner"
    >
      <p class="text-gray-800 text-sm text-center">{digimon.description}</p>
    </div>

    <SupportCard support="{support}" inner />

    <StatsCard stats="{digimon.stats}"/>
  </div>
{:else if tab === 'Skills'}
  <div class="space-y-2">
  {#each skills as skill, i}
    <SkillCard skill="{skill}" level="{digimon.learns[i].level}"/>
  {/each}
  </div>
{/if}
</Page>
