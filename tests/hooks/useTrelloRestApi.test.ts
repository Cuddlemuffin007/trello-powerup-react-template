import { renderHook } from "@testing-library/react-hooks";

import * as useTrelloToken from "../../src/hooks/useTrelloToken";
import { useTrelloRestApi } from "../../src/hooks/useTrelloRestApi";

import { t, RestApiClient } from "../helpers";

describe("useTrelloRestApi hook", () => {
    it("calls window.Trello.setToken with the current auth token and returns window.Trello object", async () => {
        jest.spyOn(useTrelloToken, "useTrelloToken").mockImplementation(() => "test_token");
        const { result } = renderHook(() => useTrelloRestApi(t));
        expect(RestApiClient.setToken).toHaveBeenCalledWith("test_token");
        expect(result.current).toBe(RestApiClient);
    });

    it("returns undefined while there is no token", async () => {
        jest.spyOn(useTrelloToken, "useTrelloToken").mockImplementation(() => undefined);
        const { result } = renderHook(() => useTrelloRestApi(t));
        expect(RestApiClient.setToken).not.toHaveBeenCalled();
        expect(result.current).toBe(undefined);
    });
});
