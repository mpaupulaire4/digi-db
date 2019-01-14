import { db } from './'

export class Digimon {
  id: number;
  name: string;
  stage: string;
  type: string;
  attribute: string;
  memory: number;
  equip_slots: number;
  image: string;
  support_skill_id: number;

  constructor() {
    Object.defineProperties(this, {
      _stats: {value: [], enumerable: false, writable: true },
      _moves: {value: [], enumerable: false, writable: true },
      _digivolveTo: {value: [], enumerable: false, writable: true },
    });
  }

  async moves() {
    const movelearns = await db.movelearn.where('digimon_id').equals(this.id).toArray()
    return "db.moves.where('id')"
  }

}

export interface IStats {
  digimon_id: number,
  level: number,
  hp: number,
  sp: number,
  atk: number,
  def: number,
  int: number,
  spd: number
}

export interface IMove {
  id: number,
  name: string,
  sp_cost: number,
  type: string,
  power: number,
  attribute: string,
  inheritable: string,
  description: string
}

export interface ISupport {
  id: number,
  name: string,
  description: string
}

export interface IMoveLearn {
  digimon_id: number,
  level: number,
  move_id: number
}

export interface IDigivolve {
  from: number,
  to: number,
  level: number,
  require: string
}