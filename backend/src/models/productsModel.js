const db = require('./db');

//buscar todos os produtos
const getAllProducts = (callback) => {
   db.query('SELECT * FROM produtos', callback);
};

//buscar por id
const getProductById = (id, callback) => {
    db.query('SELECT * FROM produtos WHERE id = ?', [id], callback);
};

//adicionar novo produto
const createProduct = (produto, callback) => {
    const { nome, descricao, preco, quantidade, categoria, imagem } = produto;
    db.query(
      'INSERT INTO produtos (nome, descricao, preco, quantidade, categoria, imagem) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, descricao, preco, quantidade, categoria, imagem],
      callback
    );
  };
  
  //atualizar algum produto
  const updateProduct = (id, produto, callback) => {
    const { nome, descricao, preco, quantidade, categoria, imagem } = produto;
    db.query(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade = ?, categoria = ?, imagem = ? WHERE id = ?',
      [nome, descricao, preco, quantidade, categoria, imagem, id],
      callback
    );
  };
  
  //excluir 
  const deleteProduct = (id, callback) => {
    db.query('DELETE FROM produtos WHERE id = ?', [id], callback);
  };
  
  module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  };