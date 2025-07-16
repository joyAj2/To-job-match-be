import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Json Parser
app.use(bodyParser.json());

// Listen to http-server on port 3000.
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
