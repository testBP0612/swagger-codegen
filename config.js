const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const path = require('path');

exports.parseArgs = () => {
  const argv = yargs(hideBin(process.argv))
    .option('local', {
      alias: 'l',
      description: '本地 Swagger JSON 文件路徑，默認路徑為 ./json/swagger.json',
      type: 'string',
    })
    .parse();
	
	if (argv.local === true || argv.local === '') {
		argv.localSwaggerPath = path.resolve(process.cwd(), './json/swagger.json');
	} else if (argv.local) {
		argv.localSwaggerPath = path.resolve(process.cwd(), argv.local);
	}

	return argv;
};
