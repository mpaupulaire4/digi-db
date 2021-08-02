import { digimon } from '$lib/data.json'

export async function get({ params }) {
  if (!params.id) return
  const digi = digimon.find(({ id }) => id == params.id)
  if (!digi) return
  return {
    body: digi
  }
}
