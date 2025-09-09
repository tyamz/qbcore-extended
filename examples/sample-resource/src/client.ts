import QBCore from 'qbcore-extended/client';

QBCore.onPlayerLoaded = (player) => {
  emit('chat:addMessage', {
    args: ['[Sample]', `Client says: ${player.citizenid} loaded.`],
  });
};

QBCore.onPlayerUnload = () => {
  emit('chat:addMessage', {
    args: ['[Sample]', 'Client says: player unloaded.'],
  });
};
