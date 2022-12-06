interface IKnexConfig {
  client: string;
  connection: string;
  pool: {
    min: number;
    max: number;
  };
  migrations?: {
    directory: string;
    tableName: string;
  };
  seeds?: {
    directory: string;
  };
}

export interface IKnexfileConfig {
  development: IKnexConfig;
  production: IKnexConfig;
}
