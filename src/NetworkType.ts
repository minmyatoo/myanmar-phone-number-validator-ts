export interface NetworkType {
    [key: string]: string;
}

export const networkType: NetworkType = {
    GSM: 'GSM',
    WCDMA: 'WCDMA',
    CDMA_450: 'CDMA 450 MHz',
    CDMA_800: 'CDMA 800 MHz',
    UNKNOWN: 'Unknown'
};
