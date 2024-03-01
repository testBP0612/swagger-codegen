const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

exports.downloadSwaggerJson = (swaggerUrl, callback) => {
  const protocol = new URL(swaggerUrl).protocol;
  const httpModule = protocol === 'https:' ? https : http;

  const swaggerDir = path.resolve(process.cwd(), `./json`);
  const swaggerPath = path.join(swaggerDir, 'swagger.json');
  fs.mkdirSync(swaggerDir, { recursive: true });

  httpModule
    .get(swaggerUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        fs.writeFileSync(swaggerPath, data);
        callback(null, swaggerPath);
      });
    })
    .on('error', (e) => {
      callback(e, null);
    });
};
