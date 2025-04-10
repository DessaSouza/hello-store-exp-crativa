const Product = require ('../models/productsModel');

//listar os produtos
const listarProdutos = (req, res) => {
    Product.getAllProducts((err, results) => {
        if (err) {
            res.status(500).json({ erro: 'Erro ao buscar os produtos'});
        } else {
            res.status(200).json (results);
        }
    });
};

//buscar por ID
const buscarProdutoPorId = (req, res) => {
    const id = req.params.id;
    Product.getProductById(id, (err, result) => {
      if (err) {
        res.status(500).json({ erro: 'Erro ao buscar o produto.' });
      } else if (result.length === 0) {
        res.status(404).json({ erro: 'Produto não localizado.' });
      } else {
        res.status(200).json(result[0]);
      }
    });
  };
  
  // Criar um produfo
  const criarProduto = (req, res) => {
    const novoProduto = req.body;
    Product.createProduct(novoProduto, (err, result) => {
      if (err) {
        res.status(500).json({ erro: 'Erro ao criar produto.' });
      } else {
        res.status(201).json({ mensagem: 'O produto foi criado.', id: result.insertId });
      }
    });
  };
  
  // Atualizar produto
  const atualizarProduto = (req, res) => {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    Product.updateProduct(id, dadosAtualizados, (err, result) => {
      if (err) {
        res.status(500).json({ erro: 'Não foi possível atualizar o produto.' });
      } else {
        res.status(200).json({ mensagem: 'O produto foi atualizado.' });
      }
    });
  };
  
  // Deletar produto
  const deletarProduto = (req, res) => {
    const id = req.params.id;
    Product.deleteProduct(id, (err, result) => {
      if (err) {
        res.status(500).json({ erro: 'Não foi possível deletar o produto.' });
      } else {
        res.status(200).json({ mensagem: 'Produto deletado com sucesso.' });
      }
    });
  };
  
  module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    deletarProduto
  };