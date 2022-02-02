import React from "react";
import { shallow, mount } from "enzyme";
import { waitFor } from "@testing-library/react";

import { Auth } from "../../src/components/Auth";
import { TrelloProvider } from "../../src/components/TrelloProvider";
import { t } from "../helpers";

describe("Auth component", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it("should render the Auth component", () => {
        const app = shallow(<Auth />);
        expect(app).toMatchSnapshot();
    });

    it("should call the authorization handler using the trello iframe object provided", async () => {
        const mockAuthorize = jest.fn();
        (t.getRestApi as jest.Mock).mockImplementation(() => ({ authorize: mockAuthorize }));
        const app = mount(
            <TrelloProvider t={t}>
                <Auth />
            </TrelloProvider>,
        );
        app.find("button.ui.button.blue").simulate("click");
        await waitFor(() => {
            // "never" is default if not provided by process.env.TRELLO_TOKEN_EXPIRATION
            expect(mockAuthorize).toHaveBeenCalledWith({ scope: "read,write", expiration: "1hour" });
        });
        app.unmount();
    });
});
