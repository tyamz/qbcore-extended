# qbcore-extended

TypeScript utilities for QBCore that simplify working with the core object and
common events.

## Installation

```bash
npm install qbcore-extended
```

## Usage

### Client

```typescript
import QBCore from 'qbcore-extended/client';

QBCore.onPlayerLoaded = (player) => {
  emit('chat:addMessage', { args: ['[TS]', `Client says: ${player.citizenid} loaded.`] });
};

QBCore.onPlayerUnload = () => {
  emit('chat:addMessage', { args: ['[TS]', 'Client says: player unloaded.'] });
};
```

### Server

```typescript
import QBCore from 'qbcore-extended/server';

QBCore.onPlayerLoaded = (player) => {
  console.log(`Player loaded: ${player.PlayerData.citizenid}`);
};

QBCore.onPlayerUnload = (playerId) => {
  console.log(`Player unloaded: ${playerId}`);
};
```

You can also import both sides from the root entry point:

```typescript
import QBCore from 'qbcore-extended';

QBCore.Client.onPlayerLoaded = () => {};
QBCore.Client.onPlayerUnload = () => {};
QBCore.Server.onPlayerLoaded = () => {};
QBCore.Server.onPlayerUnload = () => {};
```

The `core` property exposes the original QBCore object if you need to call
additional functions.

### Shared utilities and jobs

Both client and server wrappers expose QBCore's shared helpers and job
configuration:

```typescript
// Random plate using QBCore's helper
const plate = QBCore.shared.RandomStr(4);

// Access job definitions
const police = QBCore.jobs['police'];
```

### Server helpers

The server wrapper includes shortcuts for common QBCore functions and command
registration:

```typescript
// Fetch a player by source
const player = QBCore.getPlayer(source);

// Register a simple command
QBCore.registerCommand('ping', 'Replies with pong', (src) => {
  console.log(`${src} pinged`);
});
```

### Server native thread affinity

CitizenFX's JavaScript runtime requires certain server natives to run on the
main game thread. The library exposes helpers so you don't need to call
`setImmediate` manually:

```typescript
import { Natives, runOnMainThread } from 'qbcore-extended/server';

// Automatically deferred via proxy
Natives.SetPlayerRoutingBucket(playerId, 0);

// Manual wrapper for custom references
const giveWeapon = runOnMainThread(GiveWeaponToPed);
giveWeapon(playerPed, weaponHash, 250, false, false);
```

## Example resource

A minimal resource demonstrating basic usage is available in
[`examples/sample-resource`](examples/sample-resource).
