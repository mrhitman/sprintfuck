declare module 'uifx' {
  interface Config {
    asset: string;
    throttleMs?: number;
  }

  declare class UIFx {
    constructor (config: Config);
    play(): void;
    setVolume(value: number): void;
  }

  export default UIFx;
}