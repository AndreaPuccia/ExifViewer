export class Section {
  title: string;
  vectorData: { label: string, value: string }[];

  constructor(title: string) {
    this.title = title;
    this.vectorData = [];
  }
}
