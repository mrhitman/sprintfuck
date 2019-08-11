declare module 'uifx' {
  interface Config {
    asset: string;
    throttleMs?: number;
    volume?: number;
  }

  declare class UIFx {
    constructor (config: Config);
    play(volume?: number): void;
    setVolume(value: number): void;
  }

  export default UIFx;
}