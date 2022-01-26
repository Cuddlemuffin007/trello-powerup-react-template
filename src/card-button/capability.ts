import { Trello, CapabilityProps } from "../@types";

export const getCardButtons = (_t: Trello.PowerUp.IFrame, props: CapabilityProps): Trello.PowerUp.CardButton[] => {
    return [
        {
            icon: props.baseUrl + props.icon.dark,
            text: "Update Candidate Status",
            callback: (tc: Trello.PowerUp.IFrame) =>
                tc.popup({
                    title: "Update Candidate Status",
                    url: "./card-button.html",
                    height: 300,
                }),
        },
    ];
};
