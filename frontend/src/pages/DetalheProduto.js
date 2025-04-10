import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { pink, purple } from '@mui/material/colors';
import axios from 'axios';

export default function VisualizarProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/produtos/${id}`)
      .then(response => setProduto(response.data))
      .catch(() => alert('Erro ao carregar produto'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!produto) {
    return <Typography align="center" mt={4}>Produto não encontrado.</Typography>;
  }

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Card sx={{ backgroundColor: purple[50], padding: 3, width: 400, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ color: pink[400] }}>
            {produto.nome}
          </Typography>
          <img
            src={produto.imagem}
            alt={produto.nome}
            style={{ width: '100%', maxHeight: 200, objectFit: 'contain', marginBottom: 16 }}
          />
          <Typography><strong>Preço:</strong> R$ {parseFloat(produto.preco).toFixed(2)}</Typography>
          <Typography><strong>Categoria:</strong> {produto.categoria}</Typography>
          <Typography><strong>Quantidade:</strong> {produto.quantidade}</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: pink[300] }}
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
