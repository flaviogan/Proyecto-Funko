const { conn } = require('../config/conn');

const getAll = async () => {
  try {
    const [rows] = await conn.query('SELECT product.*, category.category_name, licence.licence_name FROM (product LEFT JOIN category ON product.category_id = category.category_id) LEFT JOIN licence ON product.licence_id = licence.licence_id;');
    const response = {
      isError: false,
      data: rows
    };

    return response;
  } catch (e) {
    const error = {
      isError: true,
      message: `No pudimos recuperar los datos ${e}.`
    };

    return error;
  } finally {
    await conn.releaseConnection();
  }
}

const getOne = async (params) => {
  try {
    const [rows] = await conn.query('SELECT product.*, category.category_name, licence.licence_name FROM (product LEFT JOIN category ON product.category_id = category.category_id) LEFT JOIN licence ON product.licence_id = licence.licence_id WHERE ?;', params);
    const response = {
      isError: false,
      data: rows
    };

    return response;
  } catch (e) {
    const error = {
      isError: true,
      message: `No pudimos recuperar los datos.`
    };

    return error;
  } finally {
    await conn.releaseConnection();
  }
}

const getItem = async (params) => {
    try {
        const [rows] = await conn.query('SELECT product.*, category.category_name, licence.licence_name FROM (product LEFT JOIN category ON product.category_id = category.category_id) LEFT JOIN licence ON product.licence_id = licence.licence_id WHERE ?;', params);
        const response = {
            isError: false,
            data: rows
        };
        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No pudimos recuperar los datos.`
        };
        return error;
    }
};

const getAllItemsLicences = async (licence_id) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE licence_id = ?', licence_id);
        const response = {
            isError: false,
            data: rows
        };
        return response;
    } catch (e) {
        const error = {
            isError: true,
            message: `No pudimos recuperar los datos ${e}.`
        };
        return error;
    }
}


const createItem = async (params) => {
  console.log('estoy en CREATE itemModel')
  console.log(params);
  try {
    const [rows] = await conn.query('INSERT INTO product (product_name, product_description, price, stock, discount, sku, dues, image_front, image_back, licence_id, category_id) VALUES ?;', [params]);

    const response = {
      isError: false,
      data: rows
    };

    return response;
  } catch (e) {
    console.log('estoy en CREATE ERROR itemModel')
    const error = {
      isError: true,
      message: `No pudimos crear los valores seleccionados por: ${e}`
    };

    return error;
  } finally {
    await conn.releaseConnection();
  }
};

const editItem = async (params, id) => {
  console.log('estoy en EDIT itemModel')
  try {
    const [rows] = await conn.query('UPDATE product SET ? WHERE ?;', [params, id]);
    const response = {
      isError: false,
      message: `El item fue modificado exitosamente.`,
      status: rows
    };

    return response;
  } catch (e) {
    const error = {
      isError: true,
      message: `No pudimos modificar el item seleccionado, error: ${e}`
    };

    return error;
  } finally {
    await conn.releaseConnection();
  }
};

const deleteItem = async (params) => {
  try {
    const [rows] = await conn.query('DELETE FROM product WHERE ?;', params);
    const response = {
      isError: false,
      data: rows,
      message: `Item borrado exitosamente.`
    };

    return response;
  } catch (e) {
    const error = {
      isError: true,
      message: `No pudimos insertar los valores seleccionados por: ${e}`
    }

    return error;
  } finally {
    await conn.releaseConnection();
  }
}

module.exports = {
  	getAll,
  	getOne,
    getItem,
    createItem,
    editItem,
    deleteItem,
    getAllItemsLicences
};

