import { IWidgetBaseConfig } from '../../definitions/base-widget-config.definitions';

/**
 * RVX config, contains basic configurations for rvx widget.
 */
export interface IRVXWidgetConfig extends IWidgetBaseConfig {
    /**
     * Account ID
     */
    accountId: string;
    /**
     * Embedded video name
     */
    videoName: string;
    /**
     * long region code
     */
    longRegionCode: string;
    /**
     * AVA API token
     */
    token?: string;
}
