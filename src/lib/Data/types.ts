export interface SkillLearn {
  move_id: number
  level: number
}

export interface Spawn {
  area_id: number
  exp: number
  yen: number
}

export interface DigivolveCondition {
  level: number
  hp: number
  sp: number
  atk: number
  int: number
  def: number
  spd: number
  abi: number
  cam: number
  additional: string
}

export interface Digimon {
  id: number
  description: string
  name: string
  stage: string
  type: string
  attribute: string
  memory_usage: number
  equipment_slots: number
  support_id: number
  stats: {
    hp: [number, number, number]
    sp: [number, number, number]
    atk: [number, number, number]
    int: [number, number, number]
    def: [number, number, number]
    spd: [number, number, number]
    total: [number, number, number]
  },
  images: {
    icon: string
    in_game: string
  },
  learns: SkillLearn[]
  digivolve_condition?: DigivolveCondition
  digivolve_to: number[]
  spawns: Spawn[]
}

export interface Skill {
  id: number
  icon: string
  name: string
  attribute: string
  type: string
  cost: number
  power: number
  inherited: boolean
  description: string
}

export interface Support {
  id: number
  name: string
  description: string
}

export interface Item {
  id: number
  icon: string
  name: string
  category: string
  description: string
  dropped_by_digimon: number[]
  sold_in_areas: number[]
  labeled_as?: string
  price?: number
  medal_num?: number
}

export interface Area {
  id: number
  zone_id?: number
  name: string
  subareas: number[]
  unlocks_in?: string
}
