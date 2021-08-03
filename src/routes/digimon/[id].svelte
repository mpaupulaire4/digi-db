<script context="module">
  export async function load({ fetch, page }) {
    const res = await fetch(`/digimon/${page.params.id}.json`)

    if (!res.ok) return

    return {
      props: {
        digimon: await res.json()
      }
    }
  }
</script>

<script lang="ts">
import { fade } from 'svelte/transition'
import DigiCard from '../../components/DigiCard.svelte'
import Page from '../../components/Page.svelte'

export let digimon

</script>
<Page>
  <div transition:fade>
    <DigiCard digimon="{digimon}"/>
  </div>
</Page>
