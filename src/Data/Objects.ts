import { db } from './'


export interface IDigimon {
  id: number;
  name: string;
  stage: string;
  type: string;
  attribute: string;
  memory: number;
  slots: number;
  image: string;
  sprite: string;
  favorite: boolean;
  support_skill_id: number;
  stats: {
    [level: string]: IStats
  };
}

export class Digimon implements IDigimon {
  id: number;
  name: string;
  stage: string;
  type: string;
  attribute: string;
  memory: number;
  slots: number;
  image: string;
  sprite: string;
  favorite: boolean;
  support_skill_id: number;
  digivolveTo?: IDigivoleInfo[] = [];
  digivolveFrom?: IDigivoleInfo[] = [];
  moves?: IMoveInfo[];
  supportSkill?: Support;
  stats: {
    [level: string]: IStats
  };

  constructor(digimon: IDigimon) {
    Object.assign(this, digimon)
  }

  async toggleFavorite() {
    this.favorite = !this.favorite
    return db.digimon.update(this.id, { favorite: this.favorite })
  }

  async join() {
    const [
      support_skill,
      digivolveToData,
      digivolveFromData,
      movelearns
    ] = await Promise.all([
      db.supports.get(this.support_skill_id),
      db.digivolve.where('from').equals(this.id).toArray(),
      db.digivolve.where('to').equals(this.id).toArray(),
      db.movelearn.where('digimon_id').equals(this.id).sortBy('level'),
    ])
    this.supportSkill = support_skill

    const [
      moves,
      digivolveTo,
      digivolveFrom
    ] = await Promise.all([
      db.moves.where('id').anyOf(movelearns.map(({ move_id }) => move_id)).toArray(),
      db.digimon.where('id').anyOf(digivolveToData.map(({ to }) => to)).toArray(),
      db.digimon.where('id').anyOf(digivolveFromData.map(({ from }) => from)).toArray(),
    ])

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

    const digivolveToMap = digivolveToData.reduce((map, digi) => {
      map[digi.to] = {
        level: digi.level,
        require: digi.require,
      }
      return map
    }, {} as { [move_id: string]: {level:number, require:string} })
    this.digivolveTo = digivolveTo.map((digi) => {
      const ret = digivolveToMap[digi.id]
      return {
        level: ret.level,
        require: ret.require,
        digimon: digi
      }
    })

    const digivolveFromMap = digivolveFromData.reduce((map, digi) => {
      map[digi.from] = {
        level: digi.level,
        require: digi.require,
      }
      return map
    }, {} as { [move_id: string]: {level:number, require:string} })
    this.digivolveFrom = digivolveFrom.map((digi) => {
      const ret = digivolveFromMap[digi.id]
      return {
        level: ret.level,
        require: ret.require,
        digimon: digi
      }
    })
  }
}

interface IDigivoleInfo {
  level: number,
  require: string,
  digimon: Digimon,
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
