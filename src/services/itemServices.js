const ItemModel = require('../models/itemModel');

const getAllItems = async () => {
  return await ItemModel.getAll();
}

const getOne = async (id) => {
    return await ItemModel.getOne({ product_id: id });
}

const getLicences = async (licence_id) => {
    return await ItemModel.getLicences(licence_id);
}
const getItem = async (id) => {
  return await ItemModel.getItem({product_id: id});
}

const createItem = async (item, files) => {
  console.log(item);
  // console.log(files);
  const itemSchema = {
      product_name: item.name,
      product_description: item.description,
      price: item.price,
      stock: item.stock,
      discount: item.discount,
      sku: item.sku,
      dues: item.dues,
      //licence_name: item.licence_name,
      image_front: '/' + item.licence_name + '/' + item.images[0],
      image_back: '/' + item.licence_name + '/' + item.images[0],

 
    // image_front: '/' + files[0].filename,
    // image_back: '/' + files[1].filename,
    // image_front: '/' + item.images[0],
    // image_back: '/' + item.images[1],
      licence_id: item.collection,
      category_id: item.category
  }
  return await ItemModel.createItem([Object.values(itemSchema)]);
}

const editItem = async (item, files, id) => {
  console.log('estoy en EDITITEM itemServices')
    const itemSchema = {
        product_name: item.name,
        product_description: item.description,
        price: item.price,
        stock: item.stock,
        discount: item.discount,
        sku: item.sku,
        dues: item.dues,
        // image_front: '/' + files[0].filename,
        // image_back: '/' + files[1].filename,
        licence_id: item.collection,
        category_id: item.category
    };
    if (files && files[0] && files[1]) {
        // Verifica si existen archivos y est�n definidos antes de asignar las im�genes
        itemSchema.image_front = '/' + files[0].filename;
        itemSchema.image_back = '/' + files[1].filename;
    }

  return await ItemModel.editItem(itemSchema, {product_id: id});
}

const deleteItem = async (id) => {
  console.log('toy en itemServices');
  return await ItemModel.deleteItem({product_id: id});
}

module.exports = {
    getAllItems,
    getOne,
    getItem,
    createItem,
    editItem,
    deleteItem
}