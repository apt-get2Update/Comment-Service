const shell = require('shelljs');

shell.cp('-R', 'src/config/env/*.json', 'dist/config/env/');
shell.cp('.env', 'dist/.env');