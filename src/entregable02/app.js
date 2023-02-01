/* eslint-disable operator-linebreak */
const path = require('path');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const ProductManager = require('./models/ProductManager');

const separador = (str = '-') => console.log(str.repeat(50));

(async () => {
  console.log(
    'Se creará una instancia de la clase "ProductManager"'.green.bold.inverse,
  );
  const manager = new ProductManager(path.join(__dirname, './db/data.json'));
  console.log(manager instanceof ProductManager);
  separador();

  console.log(
    'Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []'
      .green.bold.inverse,
  );
  const result1 = await manager.getProducts();
  console.log(Array.isArray(result1) && result1.length === 0);
  separador();

  console.log('Se llamará al método “addProduct”'.green.bold.inverse);
  const result2 = await manager.addProduct(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc123',
    25,
  );
  console.log(result2 === true);
  separador();

  console.log(
    'El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE'
      .green.bold.inverse,
  );
  const result3 = await manager.getProducts();
  console.log(result3.length === 1);
  const { id } = result3[0];
  const result4 = await manager.getProductById(id);
  console.log(result4);
  separador();

  console.log(
    'Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado'
      .green.bold.inverse,
  );
  console.log(await manager.getProducts());
  separador();

  console.log(
    'Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.'
      .green.bold.inverse,
  );
  console.log(await manager.getProductById(id));
  separador();

  console.log(
    'Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.'
      .green.bold.inverse,
  );
  await manager.updateProduct(id, 'code', '75Ao5a78');
  console.log(await manager.getProductById(id));
  separador();

  console.log(
    'Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.'
      .green.bold.inverse,
  );
  await manager.deleteProduct(id);
  try {
    await manager.getProductById(id);
  } catch (err) {
    console.log(`Puedo obtener el producto ya eliminado? ${err.message}`);
  }
  separador();

  console.log('*** FIN ***'.red.bold.inverse);
})();
