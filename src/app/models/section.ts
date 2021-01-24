export class Section {
  title: string;
  properties: { label: string, value: string }[];

  constructor(title: string) {
    this.title = title;
    this.properties = [];
  }

  addProperties(p: { label: string, value: string }): void {
    if (p) {
      this.properties.push(p);
    }
  }
}
