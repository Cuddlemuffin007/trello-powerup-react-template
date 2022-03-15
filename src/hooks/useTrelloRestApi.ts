import { useState, useEffect } from "react";

import { Trello } from "../@types/trello";
import { useTrelloToken } from "./useTrelloToken";

export const useTrelloRestApi = (t: Trello.PowerUp.IFrame): Trello.RestApiClient | undefined => {
    const token = useTrelloToken(t);
    const [trelloRestApi, setTrelloRestApi] = useState<Trello.RestApiClient | undefined>();

    useEffect(() => {
        if (token) {
            window.Trello.setToken(token);
            setTrelloRestApi(window.Trello);
        }
    }, [token]);

    return trelloRestApi;
};
