<script lang="ts">
import { fade } from 'svelte/transition'
import { page } from '$app/stores';
import DigiCard from '../../components/DigiCard.svelte'
import Page from '../../components/Page.svelte'
import StatsCard from '../../components/StatsCard.svelte'
import { DigimonStore, SkillStore, SupportStore, max_stats } from '$lib/Data/Database'

let id = parseInt($page.params.id);
let stat_type = 0;

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

$: support_skill = SupportStore.get(digimon.support_id)

const max = max_stats
const stat_types = [
  'Base',
  'Level 50',
  'Level 99',
]

</script>
<Page>
  <div
    slot="header"
  >
    <h1 class="text-lg leading-6 font-bold text-gray-900 capitalize tracking-wide">
      <span class="font-mono font-medium">
      #{digimon.id.toString().padStart(3, '0')}
      </span>
      {digimon.name} -
      <span class="font-mono font-medium">{digimon.stage}</span>
    </h1>
  </div>

  <div transition:fade>
    <div
      class="relative z-0 shadow-md bg-white px-6 py-6 rounded-md"
    >
      <div class="flex">
        <div class="flex-shrink-0 mb-0 mr-4 block">
          <DigiCard simple="{false}" digimon="{digimon}"/>
        </div>
      </div>
    </div>

    <div
      class="shadow-md bg-white rounded-md mt-10 p-4"
    >
      <p class="rounded-md bg-gray-200 text-gray-800 p-4 shadow-inner">{digimon.description}</p>
    </div>

    <div class="mt-8">
      <StatsCard stats="{digimon.stats}"/>
    </div>

  </div>
</Page>
