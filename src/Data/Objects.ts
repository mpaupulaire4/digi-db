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
  stats: {
    [level: string]: IStats
  };
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