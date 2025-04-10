import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import ListaProdutos from './pages/ListaProdutos';
import CadastroProduto from './pages/CadastroProduto';
import DetalheProduto from './pages/DetalheProduto';

function App() {
  return (
    <Router>
      <AppBar position="static" sx={{ bgcolor: '#f48fb1' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Hello Kitty Store 🐱
          </Typography>
          <Button color="inherit" component={Link} to="/">Listagem</Button>
          <Button color="inherit" component={Link} to="/cadastro">Cadastrar</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route path="/" element={<ListaProdutos />} />
          <Route path="/cadastro" element={<CadastroProduto />} />
          <Route path="/produto/:id" element={<DetalheProduto />} />
        </Routes>
      </Container>

      <Box textAlign="center" mt={5} mb={2}>
        <Typography variant="body2" color="text.secondary">
          Desenvolvido por Andressa Aparecida Teixeira de Souza 💖
        </Typography>
      </Box>
    </Router>
  );
}

export default App;
