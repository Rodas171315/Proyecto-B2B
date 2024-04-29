const myName = 'Dylan';
const myAge = 25;
const suma = (a: number, b: number) => a + b;

class Person {
  constructor(
    private age: number,
    private name: string,
  ) {}

  getSummary() {
    return `I'm ${this.name} and I'm ${this.age}`;
  }
}

const john = new Person(30, 'John');
john.getSummary();
