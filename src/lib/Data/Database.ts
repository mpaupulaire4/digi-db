import Dexie from "dexie";
import data from './data.json';
import type { Area, Digimon, Item, Skill, Support } from './types';

export class Database extends Dexie {
  digimon: Dexie.Table<Digimon, number>;
  skills: Dexie.Table<Skill, number>;
  supports: Dexie.Table<Support, number>;
  items: Dexie.Table<Item, number>;
  areas: Dexie.Table<Area, number>;

  constructor() {
    super('digimon-database', {
      autoOpen: true,
    })
    this.version(1).stores({
      digimon: 'id, type, attribute, stage, support_id, *digivolve_to',
      skills: 'id, type, attribute',
      supports: 'id',
      items: 'id, category, *dropped_by_digimon, *sold_in_areas',
      areas: 'id, zone_id, *subareas',
    })

    this.digimon = this.table('digimon')
    this.skills = this.table('skills')
    this.supports = this.table('supports')
    this.items = this.table('items')
    this.areas = this.table('areas')

    this.on('populate', (t) => {
      return Promise.all([
        t.table('digimon').bulkAdd(data.digimon),
        t.table('skills').bulkAdd(data.skills),
        t.table('supports').bulkAdd(data.supports),
        t.table('areas').bulkAdd(data.areas),
        t.table('items').bulkAdd(data.items),
      ])
    })
    this.open()
  }
}


const db = new Database()

export default db;
