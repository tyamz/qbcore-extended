/// <reference types="@citizenfx/server" />

/**
 * QBCore Extended TypeScript wrapper for server scripts.
 */
export type PlayerLoadedHandler = (player: any) => void;
export type PlayerUnloadHandler = (playerId: number) => void;

export class QBCoreServer {
  public core: any;
  private _onPlayerLoaded?: PlayerLoadedHandler;
  private _onPlayerUnload?: PlayerUnloadHandler;

  constructor() {
    // Retrieve the QBCore object from the qb-core resource exports
    this.core = (globalThis as any).exports['qb-core'].GetCoreObject();
    on('QBCore:Server:PlayerLoaded', (player: any) => {
      this._onPlayerLoaded?.(player);
    });
    on('QBCore:Server:OnPlayerUnload', (playerId: number) => {
      this._onPlayerUnload?.(playerId);
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
}

/**
 * Wrap a server native so it runs on the next tick, satisfying thread affinity
 * requirements described in the CitizenFX JavaScript runtime docs.
 */
export function runOnMainThread<T extends (...args: any[]) => any>(
  nativeFn: T,
): (...args: Parameters<T>) => void {
  return (...args: Parameters<T>) => {
    setImmediate(() => nativeFn(...args));
  };
}

/**
 * Proxy that automatically defers server natives to the next tick.
 * Usage: `Natives.SetPlayerRoutingBucket(playerId, bucket)`.
 */
export const Natives: Record<string, any> = new Proxy(
  {},
  {
    get(_target, prop: string) {
      const fn = (globalThis as any)[prop];
      if (typeof fn !== 'function') {
        return fn;
      }
      return (...args: any[]) => {
        setImmediate(() => fn(...args));
      };
    },
  },
);

const QBCore = new QBCoreServer();

export default QBCore;
