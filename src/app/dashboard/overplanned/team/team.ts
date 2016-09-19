export class Team {
  id: number;
  name: string;
  selected: boolean = false;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}