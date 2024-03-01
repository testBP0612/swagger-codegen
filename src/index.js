require('dotenv').config();
const { parseArgs } = require('../config');
const { downloadSwaggerJson } = require('../utils/downloadSwagger');
const { generateApiFromJson } = require('../utils/generateApi');

const { localSwaggerPath } = parseArgs();
const swaggerUrl = process.env.SWAGGER_JSON_URL;

function handleResult(err, result) {
  if (err) {
    console.error('生成 API 失敗:', err);
    return;
  }
  console.log('生成 API 成功');
}

if (localSwaggerPath) {
  generateApiFromJson(localSwaggerPath, handleResult);
} else if (swaggerUrl) {
  downloadSwaggerJson(swaggerUrl, (err, swaggerPath) => {
    if (err) {
      console.error('下載 Swagger JSON 失敗:', err);
      return;
    }
    generateApiFromJson(swaggerPath, handleResult);
  });
} else {
  console.error('請設置環境變數 SWAGGER_JSON_URL 或使用 --local 選項指定本地 Swagger JSON 文件路徑.');
  process.exit(1);
}
