import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { pink, purple } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState({ open: false, text: '', severity: 'success' });
  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 6;
  const navigate = useNavigate();

  const carregarProdutos = () => {
    axios.get('http://localhost:3000/api/produtos')
      .then(response => setProdutos(response.data))
      .catch(() => setMensagem({ open: true, text: 'Erro ao carregar produtos', severity: 'error' }));
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const excluirProduto = () => {
    axios.delete(`http://localhost:3000/api/produtos/${idParaExcluir}`)
      .then(() => {
        setMensagem({ open: true, text: 'Produto excluído com sucesso!', severity: 'success' });
        carregarProdutos();
      })
      .catch(() => {
        setMensagem({ open: true, text: 'Erro ao excluir produto', severity: 'error' });
      })
      .finally(() => setIdParaExcluir(null));
  };

  const produtosPaginados = produtos.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  return (
    <Box
  sx={{
    minHeight: '100vh',
    background: 'linear-gradient(to right, #ffe4f0, #f3e5f5)',
    py: 4,
    px: 2,
  }}
>
    
      <Typography variant="h4" align="center" sx={{ color: pink[400], mb: 3 }}>
        Lista de Produtos
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {produtosPaginados.map(produto => (
          <Grid item key={produto.id}>
            <Card sx={{ width: 220, backgroundColor: purple[50], borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{produto.nome}</Typography>
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  style={{ maxWidth: '100%', height: 100, objectFit: 'contain' }}
                />
                <Typography><strong>Preço:</strong> R$ {parseFloat(produto.preco).toFixed(2)}</Typography>
                <Typography><strong>Categoria:</strong> {produto.categoria}</Typography>
                <Typography><strong>Quantidade:</strong> {produto.quantidade}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button size="small" sx={{ color: pink[400] }} onClick={() => navigate(`/produto/${produto.id}`)}>
                  Ver detalhes
                </Button>
                <Button size="small" sx={{ color: pink[400] }} onClick={() => navigate(`/cadastro?id=${produto.id}`)}>
                  Editar
                </Button>
                <Button size="small" color="error" onClick={() => setIdParaExcluir(produto.id)}>
                  Excluir
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {produtos.length > itensPorPagina && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(produtos.length / itensPorPagina)}
            page={pagina}
            onChange={(_, value) => setPagina(value)}
            color="secondary"
          />
        </Box>
      )}

      <Snackbar
        open={mensagem.open}
        autoHideDuration={3000}
        onClose={() => setMensagem({ ...mensagem, open: false })}
      >
        <Alert severity={mensagem.severity} sx={{ width: '100%' }}>
          {mensagem.text}
        </Alert>
      </Snackbar>

      <Dialog
        open={Boolean(idParaExcluir)}
        onClose={() => setIdParaExcluir(null)}
      >
        <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setIdParaExcluir(null)}>Cancelar</Button>
          <Button onClick={excluirProduto} color="error">Excluir</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
