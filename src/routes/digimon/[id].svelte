<script lang="ts">
import { fade } from 'svelte/transition'
import { page } from '$app/stores';
import DigiCard from '../../components/DigiCard.svelte'
import Page from '../../components/Page.svelte'
import { DigimonStore, SkillStore, SupportStore } from '$lib/Data/Database'

let id = parseInt($page.params.id)

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

const max = {
  hp: 2670,
  sp: 267,
  atk: 382,
  int: 297,
  def: 999,
  spd: 282,
  total: 3608
}

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
        <div class="overflow-hidden">
          <table class="table-fixed w-full bg-gray-300 rounded-lg">
            <tbody>
              {#each ['hp', 'sp', 'atk', 'int', 'def', 'spd', 'total'] as stat}
              <tr class="border-b-4 border-gray-100">
                <th class="uppercase w-16 text-sm font-semibol">{stat}</th>
                <td
                  style
                  class="
                    bg-gray-500
                    rounded-full
                    overflow-hidden
                    text-sm
                    text-gray-200
                    font-extrabold
                    font-mono
                  "
                >
                  <span
                    style="width: {Math.round(digimon.stats[stat][2] * 100 / max[stat])}%;"
                    class="bg-gray-700 inline-block"
                  >
                    <div class="pl-5 w-14 text-right">{digimon.stats[stat][2]}</div>
                  </span>
                </td>
              </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
      <p class="mt-1 rounded-md bg-gray-200 text-gray-800 p-2 shadow-inner">{digimon.description}</p>
    </div>


  </div>
</Page>
