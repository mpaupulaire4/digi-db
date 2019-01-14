import { Database } from './Database'
import data from './data.json'

export function populate(db: Database) {
  db.on('populate', () => {
    db.digimon.bulkPut(Object.values(data.digimon))
    db.moves.bulkPut(data.moves)
    db.supports.bulkPut(data.supports)
    db.movelearn.bulkPut(data.movelearn)
    db.digivolve.bulkPut(data.digivolve)
  })
}