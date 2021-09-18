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

let tab = 'Details'
let tabs = []

const title = getContext('title')

$: id = parseInt($page.params.id);
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
$: {
  tabs = ['Details', 'Skills']
  if (digivolve_to.length) {
    tabs.push('Evolve')
  }
  if (digivolve_from.length) {
    tabs.push('De-Evolve')
  }
}

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
    <DigiRow {digimon} />
    <Tabs tabs="{tabs}" class="mt-2 -mb-2" bind:value="{tab}"/>
  </div>

  <div class="slider w-full h-full">
    <div class="slides w-full h-full space-x-5">

      <div class="space-y-4 h-full pb-4" id="details">
        <SupportCard support="{support}" inner />

        <StatsCard stats="{digimon.stats}"/>
        <div
          class="bg-white rounded-md p-4 shadow-inner"
        >
          <p class="text-gray-800 text-sm text-center">{digimon.description}</p>
        </div>
      </div>

      <div class="space-y-2 h-full" id="skills">
      {#each skills as skill, i}
        <SkillCard skill="{skill}" level="{digimon.learns[i].level}"/>
      {/each}
      </div>
    {#if digivolve_to.length}
      <div class="space-y-4 pb-4" id="evolve">
      {#each digivolve_to as digimon}
        <a href="/digi-db/digimon/{digimon.id}" class="block">
          <DigiRow {digimon}/>
        </a>
      {/each}
      </div>
    {/if}
    {#if digivolve_from.length}
      <div class="space-y-4 pb-4" id="de-evolve">
      {#each digivolve_from as digimon}
        <a href="/digi-db/digimon/{digimon.id}" class="block">
          <DigiRow {digimon}/>
        </a>
      {/each}
      </div>
    {/if}

    </div>
  </div>
</Page>

<style>
.slider {
  overflow-x: hidden;
}
.slides {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
.slides::-webkit-scrollbar {
  display: none;
  /* width: 10px; */
  /* height: 10px; */
}
.slides::-webkit-scrollbar-thumb {
  display: none;
  /* background: black; */
  /* border-radius: 10px; */
}
.slides::-webkit-scrollbar-track {
  display: none;
  /* background: transparent; */
}

.slides > div {
  scroll-snap-align: start;
  flex-shrink: 0;
  max-width: 100%;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

</style>
