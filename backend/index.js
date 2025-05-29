const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./config/database');
const phaseRoutes = require('./routes/phaseRoutes'); 
const userRoutes = require('./routes/userRoutes'); 
const { router: authRoutes } = require('./routes/authRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', phaseRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

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