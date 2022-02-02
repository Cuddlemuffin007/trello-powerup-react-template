import { Trello } from "../src/@types/trello";

import { connector } from "../src/capabilities";
import { TrelloPowerUp } from "./helpers";

describe("connector", () => {
    let opts: {
        "card-buttons": () => { icon: string; text: string; callback: (t: Trello.PowerUp.IFrame) => void }[];
    };

    beforeEach(() => {
        connector();
        opts = TrelloPowerUp.initialize.mock.calls[0][0];
    });

    test("card-buttons returns card button list", () => {
        const result = opts["card-buttons"]();
        expect(result[0]).toEqual({
            icon: expect.stringMatching(/static\/icon-dark.png$/),
            text: "Update Candidate Status",
            callback: expect.any(Function),
        });
    });
});
