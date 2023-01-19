const { v4: uuidv4 } = require('uuid');

class ProductAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ProductAlreadyExists';
  }
}

class NoIdRegisteredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoIdRegistered';
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = uuidv4().substring(0, 8);
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    this.products.some((product) => {
      if (product.code === code) {
        throw new ProductAlreadyExistsError(
          `Ya existe un producto con ese código > ${code}`
        );
      }
    });

    const newProduct = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );

    this.products.push(newProduct);
    return true;
  }

  getProductById(id) {
    for (let i = 0; i < this.products.length; i++) {
      let product = this.products[i];
      if (product.id === id) return product;
    }
    throw new NoIdRegisteredError(
      `No hay registro de  algún producto con id > ${id}`
    );
  }
}

// main program
try {
  const manager = new ProductManager();
  console.log(`Productos:`);
  console.log(manager.getProducts());

  manager.addProduct(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc123',
    25
  );
  console.log('\n----------------------------');
  console.log('|  se agrego un producto!  |');
  console.log('----------------------------\n');

  console.log(`Productos:`);
  console.log(manager.getProducts());
  console.log();

  const idBuscar = manager.products[0].id;
  console.log(`\nBuscando producto con id > ${idBuscar}`);
  const encontrado = manager.getProductById(idBuscar);
  console.log(encontrado);

  console.log();
  console.log('Agregando otro producto ...');
  manager.addProduct(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc123',
    25
  );
} catch (err) {
  if (err instanceof ProductAlreadyExistsError) {
    console.log(`ERROR: ${err.message}`);
  } else if (err instanceof NoIdRegisteredError) {
    console.log(`ERROR: ${err.message}`);
  }
}
