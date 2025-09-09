# qbcore-extended Sequelize example

A resource demonstrating how to use the `qbcore-extended` database helper with
`sequelize-typescript` to log player events.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the TypeScript source:
   ```bash
   npm run build
   ```
3. Ensure your server's `server.cfg` contains a valid `mysql_connection_string`.
4. Add the resource to `server.cfg`:
   ```bash
   ensure qbcore-extended-sequelize
   ```
