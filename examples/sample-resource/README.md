# qbcore-extended sample resource

A minimal FiveM resource demonstrating how to use the `qbcore-extended` library.
The client sends a chat message when the player loads or unloads and the server
logs similar events.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the TypeScript source:
   ```bash
   npm run build
   ```
3. Add the resource to your server's `server.cfg`:
   ```bash
   ensure qbcore-extended-sample
   ```
