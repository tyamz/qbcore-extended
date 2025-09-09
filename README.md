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
