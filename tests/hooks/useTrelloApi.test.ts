import { useTrelloApi } from "../../src/hooks/useTrelloApi";

import { TrelloPowerUp } from "../helpers";

describe("useTrelloApi hook", () => {
    it("returns a Trello PowerUp iframe initialized with values from config", () => {
        useTrelloApi();
        expect(TrelloPowerUp.iframe).toHaveBeenCalledWith({
            appKey: "test_app_key",
            appName: "Trello PowerUp React",
        });
    });
});
