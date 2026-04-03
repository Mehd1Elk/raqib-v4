#!/usr/local/bin/node
const { execSync } = require('child_process');
const port = process.env.PORT || 3000;
execSync(`/Users/mehdielkadiri/.nvm/versions/node/v24.14.1/bin/node /Users/mehdielkadiri/eigen-repos/raqib-v4/node_modules/.bin/next dev --port ${port}`, {
  cwd: '/Users/mehdielkadiri/eigen-repos/raqib-v4',
  stdio: 'inherit',
  env: { ...process.env, PATH: `/Users/mehdielkadiri/.nvm/versions/node/v24.14.1/bin:${process.env.PATH}` }
});
