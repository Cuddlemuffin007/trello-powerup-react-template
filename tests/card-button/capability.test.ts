import { getCardButtons } from "../../src/card-button/capability";

import { t } from "../helpers";

describe("get card button capability", () => {
    it("get the list of card buttons", () => {
        const capabilityProps = {
            baseUrl: "",
            icon: {
                light: "/static/light.png",
                dark: "/static/dark.png",
            },
        };
        const cardButtons = getCardButtons(t, capabilityProps);
        expect(cardButtons).toStrictEqual([
            {
                icon: "/static/dark.png",
                text: "Update Candidate Status",
                callback: expect.any(Function),
            },
        ]);
        cardButtons[0].callback(t as any);
        expect(t.popup).toHaveBeenCalledWith({
            title: "Update Candidate Status",
            url: "./card-button.html",
            height: 300,
        });
    });
});
