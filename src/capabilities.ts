import { Trello, CapabilityProps } from "./@types";
import { getCardButtons } from "./card-button/capability";

const CAPABILITY_PROPS: CapabilityProps = {
    baseUrl: window.location.href.replace(/\/$/, ""),
    icon: {
        dark: "/static/icon-dark.png",
        light: "/static/icon-light.png",
    },
};

export const connector = (): void => {
    window.TrelloPowerUp.initialize({
        "card-buttons": (t: Trello.PowerUp.IFrame) => getCardButtons(t, CAPABILITY_PROPS),
    });
};

/* istanbul ignore if */
if (typeof module !== undefined && !module.parent) {
    connector();
}
