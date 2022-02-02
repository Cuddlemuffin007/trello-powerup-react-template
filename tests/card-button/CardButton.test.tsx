import React from "react";
import { shallow } from "enzyme";

import { CardButton } from "../../src/card-button/CardButton";

describe("CardButton component", () => {
    it("should render the CardButton component", () => {
        const app = shallow(<CardButton />);
        expect(app).toMatchSnapshot();
    });
});
