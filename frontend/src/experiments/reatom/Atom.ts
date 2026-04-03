//  subscribers: Set<Listener> — слушатели atomа
// │ ├─ dependents: Set<Computed> — производные значения, зависящие от atomа
// │ ├─ name: string — имя для отладки
// │ └─ version: number — версия для отслеживания изменений

export type Listener = (newValue: unknown, oldValue: unknown) => void;

class Atom<T> {
  private subscribers: Set<Listener> = new Set();

  private version: number = 0;

  constructor(
    private value: T,
    public name: string
  ) {}

  public getValue() {
    return this.value;
  }

  public setValue(newValue: T) {
    if (Object.is(this.value, newValue)) return;

    const prevValue = this.value;

    this.value = newValue;
    this.version++;

    this.subscribers.forEach((cb) => cb(newValue, prevValue));
  }
}
