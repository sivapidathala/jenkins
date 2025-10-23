const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

if (require.main === module) {
  // Only start server if this file is run directly (not required by tests)
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;

