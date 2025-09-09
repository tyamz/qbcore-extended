/// <reference types="@citizenfx/client" />

/**
 * QBCore Extended TypeScript wrapper.
 * Provides typed helpers for obtaining the core object and listening
 * for basic events.
 */

import type { Shared, Job } from './types';

export type PlayerLoadedHandler = (player: any) => void;
export type PlayerUnloadHandler = () => void;

export class QBCoreClient {
  public core: any;
  public shared: Shared;
  public jobs: Record<string, Job>;
  private _onPlayerLoaded?: PlayerLoadedHandler;
  private _onPlayerUnload?: PlayerUnloadHandler;

  constructor() {
    // Retrieve the QBCore object from the qb-core resource exports
    this.core = (globalThis as any).exports['qb-core'].GetCoreObject();
    this.shared = this.core.Shared as Shared;
    this.jobs = this.shared.Jobs;

    on('QBCore:Client:OnPlayerLoaded', () => {
      this._onPlayerLoaded?.(this.core.PlayerData);
    });
    on('QBCore:Client:OnPlayerUnload', () => {
      this._onPlayerUnload?.();
    });
  }

  get onPlayerLoaded(): PlayerLoadedHandler | undefined {
    return this._onPlayerLoaded;
  }

  set onPlayerLoaded(handler: PlayerLoadedHandler | undefined) {
    this._onPlayerLoaded = handler;
  }

  get onPlayerUnload(): PlayerUnloadHandler | undefined {
    return this._onPlayerUnload;
  }

  set onPlayerUnload(handler: PlayerUnloadHandler | undefined) {
    this._onPlayerUnload = handler;
  }

  getJob(name: string): Job | undefined {
    return this.jobs[name];
  }
}

const QBCore = new QBCoreClient();

export default QBCore;
