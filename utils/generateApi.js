const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const fs = require('fs');

exports.generateApiFromJson = (swaggerPath, callback) => {
  const outputDir = path.resolve(process.cwd(), `./api`);
	const httpClientType = process.env.HTTP_CLIENT_TYPE;
  fs.mkdirSync(outputDir, { recursive: true });

  generateApi({
    name: 'MySuperbApi.ts',
    output: outputDir,
    input: swaggerPath,
    httpClientType: httpClientType,
    templates: path.resolve(process.cwd(), './templates/base'),
    modular: true,
  })
    .then(({ files, configuration }) => {
      files.forEach(({ content, name }) => {
        const outputPath = path.join(configuration.config.output, name);
        fs.writeFile(outputPath, content, (err) => {
          if (err) {
            console.error(`Error writing file ${name}:`, err);
          } else {
            console.log(`File ${name} has been written successfully.`);
          }
        });
      });
			callback(null, files);
    })
    .catch((e) => callback(e, null));
};
