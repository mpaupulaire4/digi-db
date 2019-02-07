import { db } from './'


export class Digimon {
  id: number;
  name: string;
  stage: string;
  type: string;
  attribute: string;
  memory: number;
  slots: number;
  image: string;
  sprite: string;
  favorite: boolean = false;
  support_skill_id: number;
  dedigivolve: {
    to: number[]
    level?: number
    require?: string
    mode_change?: number
  }
  stats: {
    [level: string]: IStats
  };
  digivolveTo: Digimon[] = [];
  digivolveFrom: Digimon[] = [];
  moves?: IMoveInfo[];
  supportSkill?: Support;

  async toggleFavorite() {
    this.favorite = !this.favorite
    return db.digimon.update(this.id, { favorite: this.favorite })
  }

  async join() {
    const [
      support_skill,
      digivolveTo,
      digivolveFrom,
      movelearns
    ] = await Promise.all([
      db.supports.get(this.support_skill_id),
      db.digimon.where('dedigivolve.to').equals(this.id).toArray(),
      db.digimon.where('id').anyOf(this.dedigivolve.to).toArray(),
      db.movelearn.where('digimon_id').equals(this.id).sortBy('level'),
    ])
    this.supportSkill = support_skill
    this.digivolveTo = digivolveTo || []
    this.digivolveFrom = digivolveFrom || []

    const moves = await db.moves.where('id').anyOf(movelearns.map(({ move_id }) => move_id)).toArray()

    const moveMap = moves.reduce((map, move) => {
      map[move.id] = move
      return map
    }, {} as { [move_id: string]: Move })
    this.moves = movelearns.map((movelearn) => {
      return {
        move: moveMap[movelearn.move_id],
        level: movelearn.level
      }
    })

  }
}

interface IMoveInfo {
  level: number,
  move: Move,
}

export interface IStats {
  hp: number,
  sp: number,
  atk: number,
  def: number,
  int: number,
  spd: number
}

export class Move {
  id: number;
  name: string;
  sp_cost: number;
  type: string;
  power: number;
  attribute: string;
  inheritable: string;
  description: string;

  async digimon(): Promise<Digimon[]> {
    const movelearns = await db.movelearn.where('move_id').equals(this.id).toArray()
    return db.digimon.where('id').anyOf(movelearns.map(({ digimon_id }) => digimon_id )).toArray()
  }
}

export class Support {
  id: number;
  name: string;
  description: string;
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
