import { Trello } from "../@types/trello";

export const useTrelloApi = (): Trello.PowerUp.IFrame => {
    return window.TrelloPowerUp.iframe();
};
