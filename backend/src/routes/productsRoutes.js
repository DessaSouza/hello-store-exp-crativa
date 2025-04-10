const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');

router.get('/', controller.listarProdutos); //GET todos os produtos
router.get('/:id', controller.buscarProdutoPorId); // GET por ID
router.post('/', controller.criarProduto); // POST novo produto
router.put('/:id', controller.atualizarProduto); // PUT atualizar produto
router.delete('/:id', controller.deletarProduto); // DELETE produto

module.exports = router;