import QBCore from 'qbcore-extended/server';

QBCore.onPlayerLoaded = (player) => {
  console.log(`Server saw player loaded: ${player.PlayerData.citizenid}`);
};

QBCore.onPlayerUnload = (playerId) => {
  console.log(`Server saw player unloaded: ${playerId}`);
};
