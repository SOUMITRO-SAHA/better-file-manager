export interface IDisk {
  name: string;
  mountPoint: string;
  totalSpace: number;
  availableSpace: number;
}

export interface ISystem {
  disk: IDisk;
}
