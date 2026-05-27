// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware para tratamento de JSON
app.use(bodyParser.json());

// Rota para envio de e-mail
app.post('/send-email', async (req, res) => {
  const { email, message } = req.body;

  // Criação do transporte de e-mail usando o Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Seu e-mail do Gmail
      pass: 'your-email-password' // Sua senha ou senha de aplicativo
    }
  });

  // Configuração do e-mail
  const mailOptions = {
    from: email, // De quem o e-mail está vindo (usuário)
    to: 'arthurdeveloperprime@gmail.com', // Seu e-mail
    subject: 'Mensagem de Contato',
    text: message // Corpo da mensagem
  };

  try {
    // Enviar o e-mail
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    res.status(500).json({ message: 'Erro ao enviar o e-mail. Tente novamente!' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
