<script lang="ts">
import { fade } from 'svelte/transition'
import { getContext } from 'svelte'
import { page } from '$app/stores';
import DigiCard from '../../components/DigiCard.svelte'
import Page from '../../components/Page.svelte'
import StatsCard from '../../components/StatsCard.svelte'
import SupportCard from '../../components/SupportCard.svelte'
import DigiRow from '../../components/DigiRow.svelte'
import { DigimonStore, SkillStore, SupportStore } from '$lib/Data/Database'

let id = parseInt($page.params.id);
let stat_type = 0;

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

$: {
  title.set(`${digimon.name} - #${digimon.id.toString().padStart(3, '0')}`)
}

</script>
<svelte:head>
  <title>{digimon.name}</title>
</svelte:head>
<Page>
  <svelte:fragment
    slot="header"
  >
    <!-- <h1 class="text-lg leading-6 font-bold text-gray-900 capitalize tracking-wide">
      <span class="font-mono font-medium">
      #{digimon.id.toString().padStart(3, '0')}
      </span>
      {digimon.name} -
      <span class="font-mono font-medium">{digimon.stage}</span>
    </h1> -->
    <DigiRow digimon="{digimon}"/>
  </svelte:fragment>

  <div>

    <SupportCard support="{support}"/>
    <div
      class="shadow-md bg-white rounded-md mt-6 p-4"
    >
      <p class="rounded-md bg-gray-200 text-gray-800 p-4 shadow-inner">{digimon.description}</p>
    </div>

    <div class="mt-8">
      <StatsCard stats="{digimon.stats}"/>
    </div>

  </div>
</Page>
