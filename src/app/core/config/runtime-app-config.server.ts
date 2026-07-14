import productionRuntimeAppConfig from '../../../assets/config/app-config.json';
import { parseAppConfig } from './runtime-app-config';
import { AppConfig } from './app-config.model';

export async function loadServerRuntimeAppConfig(): Promise<AppConfig> {
  return parseAppConfig(productionRuntimeAppConfig as unknown);
}
