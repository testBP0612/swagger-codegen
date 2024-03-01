# code gen api endpoint 專案說明
## 使用方式
所需的依賴項目已經寫在 `package.json` 內，首先執行以下指令
```
npm install
```

接著有兩種使用方法

1. 使用線上網址進行 codegen
修改 `SWAGGER_JSON_URL`，貼上 swagger json 的網址
執行 `npm run generate` 即可產生所需的檔案。

2. 使用 `npm run generate -- --local` 或 `npm run generate -- -l`
來指定使用本地的 json 檔案，路徑是 `./json/swagger.json`

## 說明
`/src/api`: gen 出來的程式碼。
`/src/index.js`: 主要的執行檔案。
`/templates`: codegen 的範本檔案，修改它會改變 code gen 的結果，可根據官方網站說明進行修改。
`/json/swagger.json`: 放置 codegen 所需的 json。執行指令後會從 swagger 線上網址複製下來。