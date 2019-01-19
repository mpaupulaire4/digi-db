import Dexie from 'dexie'
import { Digimon, Move, Support, IMoveLearn, IDigivolve } from './Objects'
import { populate } from './Populate';


export class Database extends Dexie {
  digimon: Dexie.Table<Digimon, number>
  moves: Dexie.Table<Move, number>
  supports: Dexie.Table<Support, number>
  movelearn: Dexie.Table<IMoveLearn, number>
  digivolve: Dexie.Table<IDigivolve, number>

  constructor() {
    super('DigiDB', { autoOpen: true })
    this.version(1).stores({
      digimon: `id,&name,stage,type,attribute,memory,slots,support_skill_id`,
      moves: 'id, name, sp_cost, type, power, attribute, inheritable, description',
      supports: 'id, name, description',
      movelearn: '++, digimon_id, move_id, &[digimon_id+move_id], level',
      digivolve: '++, from, to, [from+to], level',
    })
    this.version(2).stores({
      digimon: `id,&name,stage,type,attribute,memory,slots,support_skill_id,favorite`,
      // ,stats.01.hp,stats.01.sp,stats.01.atk,stats.01.def,stats.01.int,stats.01.spd,stats.99.hp,stats.99.sp,stats.99.atk,stats.99.def,stats.99.int,stats.99.spd,stats.50.hp,stats.50.sp,stats.50.atk,stats.50.def,stats.50.int,stats.50.spd
    })

    this.table('digimon').mapToClass(Digimon)
    this.table('moves').mapToClass(Move)
    this.table('supports').mapToClass(Support)

    this.digimon = this.table('digimon')
    this.moves = this.table('moves')
    this.supports = this.table('supports')
    this.movelearn = this.table('movelearn')
    this.digivolve = this.table('digivolve')

    populate(this)
  }

}