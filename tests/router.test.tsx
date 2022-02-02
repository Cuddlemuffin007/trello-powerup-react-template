import React from "react";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";

import { PowerUpRouter } from "../src/router";
import { TrelloPowerUp } from "./helpers";

describe("application router", () => {
    it("should create a trello powerup iframe and render without crashing", async () => {
        const app = mount(<PowerUpRouter />);
        await waitFor(() => {
            expect(TrelloPowerUp.iframe).toHaveBeenCalledWith({
                appKey: "test_app_key",
                appName: "Trello PowerUp React",
            });
        });
        expect(app.update()).toMatchSnapshot();
        app.unmount();
    });
});
