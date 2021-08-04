<script lang="ts">
import { fade } from 'svelte/transition'
import { page } from '$app/stores';
import DigiCard from '../../components/DigiCard.svelte'
import Page from '../../components/Page.svelte'
import { DigimonStore } from '$lib/Data/Database'

let digimon = DigimonStore.get(parseInt($page.params.id))

</script>
<Page>
  <div transition:fade>
    <DigiCard digimon="{digimon}"/>
  </div>
</Page>
