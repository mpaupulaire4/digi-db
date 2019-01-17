
type Subscriber = (text: string) => void

export class NotificationService {
  private static subscribers: { [id: number]:Subscriber } = {}
  private static nextID: number = 0

  static async notify(text: string) {
    Object.values(this.subscribers).forEach((sub) => sub(text))
  }

  static subscribe(sub: Subscriber) {
    const id = this.nextID++
    this.subscribers[id] = sub
    return () => {
      delete this.subscribers[id]
    }
  }

}