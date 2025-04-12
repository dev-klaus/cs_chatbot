require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { generateEmbeddings, dumpDB, askQuestion } = require('./helpers');
const { logger } = require('./logger');

const server = async () => {
  logger.debug('INIT START');
  const app = express();
  const PORT = process.env.BACKEND_PORT;

  // Serve static files from the front folder
  app.use(express.static(path.join(__dirname, '../front')));
  app.use(bodyParser.json());

  // Endpoint to handle question POSTs
  app.post('/api/question', async (req, res) => {
    logger.debug('Handling /api/question');

    const { question } = req.body;
    const answer = await askQuestion(question);

    res.json({ answer });
  });

  app.get('/api/dump_db', async (req, res) => {
    logger.debug('Handling /api/dump_db');
    const result = await dumpDB();
    res.json({ result });
  });

  app.get('/api/gen_embeddings', async (req, res) => {
    logger.debug('Handling /api/gen_embeddings');
    await generateEmbeddings();
    res.json({ status: 1 });
  });

  // Start server
  app.listen(PORT, () => {
    logger.debug(`Server running on http://localhost:${PORT}`);
  });

  logger.debug('INIT DONE');
};

server().catch((err) => logger.error(`ERROR: ${err.message}`));
