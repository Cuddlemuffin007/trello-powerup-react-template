import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { RestApiClient, TrelloPowerUp } from "./helpers";

// configure enzyme adapter
configure({ adapter: new Adapter() });

beforeAll(() => {
    window.Trello = RestApiClient;
    window.TrelloPowerUp = TrelloPowerUp;
});
