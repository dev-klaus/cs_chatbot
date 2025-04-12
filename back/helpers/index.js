/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { OpenAI } = require('openai');
const { query } = require('../db');

const getEmbedding = async (text, oai) => {
  const response = await oai.embeddings.create({
    input: text,
    model: 'text-embedding-3-small',
  });
  return response.data[0].embedding;
};

const generateEmbeddings = async () => {
  const openai = new OpenAI({ apiKey: process.env.OAI_KEY });

  // Store embeddings for all documents (run once)
  const docs = await query('SELECT id, content FROM docs.documents');
  for (const doc of docs.rows) {
    const embedding = await getEmbedding(doc.content, openai);
    await query('UPDATE docs.documents SET embedding = $1 WHERE id = $2', [`[${embedding.join(',')}]`, doc.id]);
  }
};

const dumpDB = async () => {
  const docs = await query('SELECT id, content, embedding FROM docs.documents');

  return docs.rows;
};

const askQuestion = async (question) => {
  const openai = new OpenAI({ apiKey: process.env.OAI_KEY });

  const queryEmbedding = await getEmbedding(question, openai);

  // Search PostgreSQL/pgvector for similar documents
  const { rows } = await query('SELECT content FROM docs.documents ORDER BY embedding <=> $1 LIMIT 3;', [JSON.stringify(queryEmbedding)]);

  // Generate answer using OpenAI
  const context = rows.map((row) => row.content).join('\n');

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Answer the question based on the context.' },
      { role: 'user', content: `Context: ${context}\nQuestion: ${question}` },
    ],
  });

  return completion.choices[0].message.content;
};

module.exports = {
  generateEmbeddings,
  getEmbedding,
  dumpDB,
  askQuestion,
};
