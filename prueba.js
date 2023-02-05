const fs = require('fs').promises;

class Coso {
  static data;

  constructor(name) {
    this.name = name;
  }

  static async load() {
    const raw = await fs.readFile('src/db/data.json');
    const json = JSON.parse(raw);
    const object = json.products;
    Coso.data = object;
  }
}

(async () => {
  await Coso.load();
  console.log(Object.keys(Coso.data).length);
})();
