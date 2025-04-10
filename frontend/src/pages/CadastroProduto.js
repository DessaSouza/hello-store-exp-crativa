import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { pink, purple } from '@mui/material/colors';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CadastroProduto() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidade: '',
    categoria: '',
    imagem: '',
  });

  const [mensagem, setMensagem] = useState({ open: false, text: '', severity: 'success' });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/produtos/${id}`)
        .then(response => setForm(response.data))
        .catch(() => {
          setMensagem({ open: true, text: 'Erro ao carregar produto', severity: 'error' });
        });
    } else {
      // Lista de 5 produtos para sorteio no cadastro
      const produtosExemplo = [
        {
          nome: 'Pelúcia Hello Kitty',
          descricao: 'Pelúcia fofa com laço vermelho.',
          preco: '89.90',
          quantidade: '15',
          categoria: 'Pelúcias',
          imagem: 'https://i.imgur.com/ZF0BZKU.jpg'
        },
        {
          nome: 'Caneca My Melody',
          descricao: 'Caneca com estampa da personagem My Melody.',
          preco: '39.90',
          quantidade: '20',
          categoria: 'Utilidades',
          imagem: 'https://i.imgur.com/XrD7U4P.jpg'
        },
        {
          nome: 'Mochila Pompompurin',
          descricao: 'Mochila divertida com o personagem Pompompurin.',
          preco: '79.90',
          quantidade: '10',
          categoria: 'Acessórios',
          imagem: 'https://i.imgur.com/fuF8vI6.jpg'
        },
        {
          nome: 'Luminária Keroppi',
          descricao: 'Luminária LED com o tema do sapinho Keroppi.',
          preco: '45.00',
          quantidade: '8',
          categoria: 'Decoração',
          imagem: 'https://i.imgur.com/UZznlAO.jpg'
        },
        {
          nome: 'Caderno Cinnamoroll',
          descricao: 'Caderno com capa dura do Cinnamoroll.',
          preco: '22.50',
          quantidade: '30',
          categoria: 'Papelaria',
          imagem: 'https://i.imgur.com/Wv3Il9o.jpg'
        }
      ];

      // Escolhe um aleatório
      const aleatorio = produtosExemplo[Math.floor(Math.random() * produtosExemplo.length)];
      setForm(aleatorio);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      preco: parseFloat(form.preco),
      quantidade: parseInt(form.quantidade),
    };

    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/produtos/${id}`, payload);
        setMensagem({ open: true, text: 'Produto atualizado com sucesso!', severity: 'success' });
      } else {
        await axios.post('http://localhost:3000/api/produtos', payload);
        setMensagem({ open: true, text: 'Produto cadastrado com sucesso!', severity: 'success' });
      }

      setTimeout(() => navigate('/'), 1500);
    } catch {
      setMensagem({ open: true, text: 'Erro ao salvar produto', severity: 'error' });
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: pink[400] }}>
        {id ? 'Editar Produto' : 'Cadastrar Produto'}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 700, mx: 'auto', backgroundColor: purple[50], p: 4, borderRadius: 2 }}
      >
        <Grid container spacing={2}>
          {['nome', 'descricao', 'preco', 'quantidade', 'categoria', 'imagem'].map(field => (
            <Grid item xs={12} sm={field === 'descricao' || field === 'imagem' ? 12 : 6} key={field}>
              <TextField
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={form[field]}
                onChange={handleChange}
                type={['preco', 'quantidade'].includes(field) ? 'number' : 'text'}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, backgroundColor: pink[300], '&:hover': { backgroundColor: pink[400] } }}
        >
          {id ? 'Salvar Alterações' : 'Cadastrar'}
        </Button>
      </Box>

      <Snackbar
        open={mensagem.open}
        autoHideDuration={3000}
        onClose={() => setMensagem({ ...mensagem, open: false })}
      >
        <Alert severity={mensagem.severity} sx={{ width: '100%' }}>
          {mensagem.text}
        </Alert>
      </Snackbar>
    </Box>
  );
}
