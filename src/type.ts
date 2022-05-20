import { KeyObject } from '@satumjs/core';

type Entry = string | { scripts?: string[]; styles?: string[]; html?: string };
export type RegistrableApp = {
  name: string;
  entry: Entry;
  container: string | HTMLElement;
  activeRule: string | ((location: Location) => boolean) | Array<string | ((location: Location) => boolean)>;
  loader?: (loading: boolean) => void;
  props?: KeyObject<any>;
};

type Lifecycle = (app: RegistrableApp) => Promise<any>;
export type LifeCycles = {
  beforeLoad?: Lifecycle | Array<Lifecycle>;
  beforeMount: Lifecycle | Array<Lifecycle>;
  afterMount: Lifecycle | Array<Lifecycle>;
  beforeUnmount: Lifecycle | Array<Lifecycle>;
  afterUnmount: Lifecycle | Array<Lifecycle>;
};

export type Options = {
  prefetch?: boolean | 'all' | string[] | ((apps: RegistrableApp[]) => { criticalAppNames: string[]; minorAppsName: string[] });
  sandbox?: boolean | { strictStyleIsolation?: boolean; experimentalStyleIsolation?: boolean };
  singular?: boolean | ((app: RegistrableApp) => Promise<boolean>);
  fetch?: Function;
  getPublicPath?: (entry: Entry) => string;
  getTemplate?: (tpl: string) => string;
  excludeAssetFilter?: (assetUrl: string) => boolean;
};
