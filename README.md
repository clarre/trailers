# Trailers API

Sample project that finds trailer links for movies

## Prerequisites

- NodeJS, check version in .nvmrc file
- Yarn
- TypeScript (local dependency)
- PM2 (yarn global add pm2)

## Testing and linting

Run jest tests through `yarn test`

Run eslint and prettier `yarn lint`

To let eslint fix for you run `yarn lint --fix`

### VSCode

To automatically run prettier and eslint add following extensions in vscode:

- Name: ESLint
  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

- Name: Prettier - Code formatter
  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

Also add this to .vscode folder in settings.json
{
"editor.codeActionsOnSave": { "source.fixAll.eslint": true },
"editor.formatOnSave": true,
"eslint.alwaysShowStatus": true,
}

## Running application

To install all dependencies run:
yarn install --frozen-lockfile

## Environmental variables

Create .env file with following (switch API-token with your API Key (v3 auth) token):

```
PORT=5000
TMDb_token=<API-token>
```

## Endpoint

Endpoint is your server host /api/<viaplay moviename/slug>

ex. http://localhost:5000/api/arrival-2016

### Dev mode

To start dev server run `yarn dev` which starts a ts-node nodemon server

### Production mode

Make sure you added the pm2 service (yarn global add pm2) make sure yarn global path is in bashrc or zshrc, or whaterver shell you are using

Run `yarn build` to transpile files and generate dist bundle to be used for production

Start pm2 for running the application in production and serve transpiled ts files from dist folder

- Run `yarn build` to transpile files and generate dist bundle to be used for production
- Start process `pm2 start ecosystem.config.js`
- Stop process `pm2 stop ecosystem.config.js`
- Delete process `pm2 delete ecosystem.config.js`

## Debugging

To debug application run `yarn dev:debug` which starts a ts-node nodemon server in debug mode

For vscode debugger create a launch.json in .vscode folder and paste following

```
"version": "0.2.0",
"configurations":
  [
    { "type": "node",
      "request": "attach",
      "name": "Node: Nodemon",
      "processId": "${command:PickProcess}",
      "restart": true,
      "protocol": "inspector"
    }
  ]
```

## TODO

- Add yarn policies to version control yarn
- Add more typings
- Code coverage
- git hook to lint before pushing
- Caching requests (Redis?)
- Add logging
