import { ServiceConfig } from "./config-services";

export interface Config {
  readonly authUrl: string;
  readonly authClient: string;
  readonly authScope: string;
  readonly authUser: string;
  readonly env: string;
  readonly personSearchServiceConfigs: ServiceConfig[];
}
