const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const compression = require('compression'); // Importa o middleware de compressão

const app = express();
const port = process.env.PORT || 8080;

// Endereço IP do seu servidor VPS
const targetServer = 'http://157.254.54.194:8000';

// Aplica a compressão para as respostas enviadas pelo poxyr
app.use(compression());

// Middleware do Proxy
app.use('/', createProxyMiddleware({
  target: targetServer,
  changeOrigin: true,
  ws: true, // Habilita suporte a WebSocket
  secure: false, // Desabilita a verificação de SSL (caso não use HTTPS)
  onProxyReq: (proxyReq, req, res) => {
    // Adiciona cabeçalhos adicionais, se necessário
    proxyReq.setHeader('X-Added', 'foobar');
  },
  onProxyRes: (proxyRes, req, res) => {
    // Configura cabeçalhos de compressão na resposta, se necessário
    res.setHeader('Content-Encoding', 'gzip');
  },
  onError: (err, req, res) => {
    // Lida com erros do proxy
    console.error('Proxy error:', err);
    res.status(500).send('Something went wrong with the proxy');
  }
}));

// Inicia o servidor
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
