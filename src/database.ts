import { Sequelize, Model, ModelCtor } from 'sequelize-typescript';
import fs from 'fs';
import path from 'path';

function findServerCfg(): string | undefined {
  let dir = process.cwd();
  for (let i = 0; i < 5; i++) {
    const cfg = path.join(dir, 'server.cfg');
    if (fs.existsSync(cfg)) {
      return cfg;
    }
    dir = path.dirname(dir);
  }
  return undefined;
}

function getConnectionString(): string {
  const getConvar = (globalThis as any).GetConvar;
  if (typeof getConvar === 'function') {
    const convar = getConvar('mysql_connection_string', '');
    if (convar) {
      return convar;
    }
  }

  const cfgPath = findServerCfg();
  if (cfgPath) {
    const contents = fs.readFileSync(cfgPath, 'utf-8');
    const match = contents.match(/^set\s+mysql_connection_string\s+["']?(.+?)["']?$/m);
    if (match) {
      return match[1];
    }
  }

  throw new Error('mysql_connection_string not found in server.cfg');
}

let sequelize: Sequelize | undefined;

export function getSequelize(models: ModelCtor<Model>[] | string[] = []): Sequelize {
  if (!sequelize) {
    const connectionString = getConnectionString();
    sequelize = new Sequelize(connectionString, { models });
  }
  return sequelize;
}

export function createSequelize(models: ModelCtor<Model>[] | string[] = []): Sequelize {
  const connectionString = getConnectionString();
  return new Sequelize(connectionString, { models });
}

export default getSequelize;
