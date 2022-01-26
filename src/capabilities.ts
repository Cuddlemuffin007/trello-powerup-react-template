import { Trello, CapabilityProps } from "./@types";
import { getCardButtons } from "./card-button/capability";

const CAPABILITY_PROPS: CapabilityProps = {
    baseUrl: window.location.href.replace(/\/$/, ""),
    icon: {
        dark: "/static/icon-dark.png",
        light: "/static/icon-light.png",
    },
};

window.TrelloPowerUp.initialize({
    "card-buttons": (t: Trello.PowerUp.IFrame) => getCardButtons(t, CAPABILITY_PROPS),
});
