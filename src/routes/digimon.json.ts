import { digimon } from '$lib/data.json'

export async function get() {
  return {
    body: digimon
  }
}
