import data from './data.json';
import type { Area, Digimon, Item, Skill, Support } from './types';
import { ObjectStore } from '../Store'

export const DigimonStore = new ObjectStore<Digimon, number>('digimon', [
  {
    name: 'type',
    hash: true,
  },
  {
    name: 'attribute',
    hash: true,
  },
  {
    name: 'stage',
    hash: true,
  },
  {
    name: 'support_id',
    hash: true,
  },
  {
    name: 'digivolve_to',
    hash: true,
  },
], 'id')

export const SkillStore = new ObjectStore<Skill, number>('skills', [
  {
    name: 'type',
    hash: true,
  },
  {
    name: 'attribute',
    hash: true,
  },
], 'id')

export const SupportStore = new ObjectStore<Support, number>('supports', [], 'id')

export const AreaStore = new ObjectStore<Area, number>('areas', [
  {
    name: 'type',
    hash: true,
  },
  {
    name: 'zone_id',
    hash: true,
  },
  {
    name: 'subareas',
    hash: true,
  },
], 'id')

export const ItemStore = new ObjectStore<Item, number>('items', [
  {
    name: 'category',
    hash: true,
  },
  {
    name: 'dropped_by_digimon',
    hash: true,
  },
  {
    name: 'sold_in_areas',
    hash: true,
  },
], 'id')

export const loaded = Promise.all<any>([
  ...data.digimon.map((d) => DigimonStore.insert(d as any as Digimon)),
  ...data.skills.map((d) => SkillStore.insert(d as any as Skill)),
  ...data.supports.map((d) => SupportStore.insert(d as any as Support)),
  ...data.areas.map((d) => AreaStore.insert(d as any as Area)),
  ...data.items.map((d) => ItemStore.insert(d as any as Item)),
])
