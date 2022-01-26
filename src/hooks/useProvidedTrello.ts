import React, { useContext } from "react";
import { TrelloContext } from "../components/TrelloProvider";
import { Trello } from "../@types/trello";

export const useProvidedTrello = (): Trello.PowerUp.IFrame => {
    return useContext<Trello.PowerUp.IFrame>(TrelloContext as React.Context<Trello.PowerUp.IFrame>);
};
