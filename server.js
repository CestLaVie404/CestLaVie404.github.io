const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static(__dirname)); // Stelle alle Dateien im aktuellen Verzeichnis zur Verfügung

const port = 3000; // Wähle einen beliebigen Port

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
