import 'reflect-metadata';
import QBCore, { getSequelize } from 'qbcore-extended/server';
import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table({ tableName: 'player_logs', timestamps: false })
class PlayerLog extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column(DataType.INTEGER)
  playerId!: number;

  @Column(DataType.STRING)
  action!: string;
}

async function start() {
  const sequelize = getSequelize([PlayerLog]);
  await sequelize.sync();

  QBCore.onPlayerLoaded = (player) => {
    void PlayerLog.create({ playerId: player.PlayerData.source, action: 'loaded' });
  };

  QBCore.onPlayerUnload = (playerId) => {
    void PlayerLog.create({ playerId, action: 'unloaded' });
  };
}

start().catch((e) => console.error(e));
