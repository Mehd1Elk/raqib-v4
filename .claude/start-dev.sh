#!/usr/bin/env bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
export PATH="/Users/mehdielkadiri/.nvm/versions/node/v24.14.1/bin:$PATH"
cd /Users/mehdielkadiri/eigen-repos/raqib-v4
exec npx next dev --port ${PORT:-3000}
