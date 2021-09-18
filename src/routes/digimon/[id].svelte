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

  <div class="slider w-full overflow-x-hidden">
    <div class="space-y-4">
      <div
        class="bg-white rounded-md p-4 shadow-inner"
      >
        <p class="text-gray-800 text-sm text-center">{digimon.description}</p>
      </div>

      <SupportCard support="{support}" inner />

      <StatsCard stats="{digimon.stats}"/>
    </div>

    <div class="space-y-2">
    {#each skills as skill, i}
      <SkillCard skill="{skill}" level="{digimon.learns[i].level}"/>
    {/each}
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

  /*
  scroll-snap-points-x: repeat(300px);
  scroll-snap-type: mandatory;
  */
}
.slides::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.slides::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 10px;
}
.slides::-webkit-scrollbar-track {
  background: transparent;
}
.slides > div {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 300px;
  height: 300px;
  margin-right: 50px;
  border-radius: 10px;
  background: #eee;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
}
.slides > div:target {
/*   transform: scale(0.8); */
}
.author-info {
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 0.75rem;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
}
.author-info a {
  color: white;
}
img {
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slider > a {
  display: inline-flex;
  width: 1.5rem;
  height: 1.5rem;
  background: white;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 0 0.5rem 0;
  position: relative;
}
.slider > a:active {
  top: 1px;
}
.slider > a:focus {
  background: #000;
}

/* Don't need button navigation */
@supports (scroll-snap-type) {
  .slider > a {
    display: none;
  }
}

html, body {
  height: 100%;
  overflow: hidden;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #74ABE2, #5563DE);
  font-family: 'Ropa Sans', sans-serif;
}
</style>
