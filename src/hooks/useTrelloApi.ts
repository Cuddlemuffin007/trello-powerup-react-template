import { Trello } from "../@types/trello";
import config from "../config";

export const useTrelloApi = (): Trello.PowerUp.IFrame => {
    const {
        trello: { appKey, appName },
    } = config;
    return window.TrelloPowerUp.iframe({ appKey, appName });
};
