import { Trello } from "./trello";

export interface TrelloProviderProps {
    t: Trello.PowerUp.IFrame;
    children?: React.ReactNode | React.ReactElement;
}
