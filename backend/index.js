const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./config/database');
const phaseRoutes = require('./routes/phaseRoutes');
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// Rotas da API
app.use('/api', phaseRoutes);
app.use('/api', authRoutes); // Adiciona as rotas de autenticação

// Redirecionar a rota raiz (/) para index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Sincronizar o banco de dados
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
};

startServer();