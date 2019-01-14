import Dexie from 'dexie'
import { Digimon, IMove, ISupport, IStats, IMoveLearn, IDigivolve } from './Objects'


export class Database extends Dexie {
  digimon: Dexie.Table<Digimon, number>
  moves: Dexie.Table<IMove, number>
  supports: Dexie.Table<ISupport, number>
  stats: Dexie.Table<IStats, number>
  movelearn: Dexie.Table<IMoveLearn, number>
  digivolve: Dexie.Table<IDigivolve, number>

  constructor() {
    super('DigiDB')
    this.version(1).stores({
      digimon: 'id, name, stage, type, attribute, memory, equip_slots, support_skill_id',
      moves: 'id, name, sp_cost, type, power, attribute, inheritable, description',
      supports: 'id, name, description',
      stats: 'digimon_id, level, hp, sp, atk, def, int, spd',
      movelaern: 'digimon_id, move_id, level',
      digivolve: 'from, to, level',
    })

    this.digimon.mapToClass(Digimon)
  }

}