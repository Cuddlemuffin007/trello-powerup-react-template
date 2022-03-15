import { renderHook } from "@testing-library/react-hooks";

import { useTrelloToken } from "../../src/hooks/useTrelloToken";

import { t, RestApiClient } from "../helpers";

describe("useTrelloToken hook", () => {
    test("should call setToken with the current valid auth token and return it", async () => {
        const mockGetToken = jest.fn().mockResolvedValue("test_token");
        (t.getRestApi as jest.Mock).mockResolvedValue({ getToken: mockGetToken });
        const dateExpires = Date.now() + 3600; // one hour later
        RestApiClient.get.mockResolvedValue({ dateExpires });

        const { result, waitForNextUpdate } = renderHook(() => useTrelloToken(t));
        await waitForNextUpdate();
        expect(t.getRestApi).toHaveBeenCalledTimes(1);
        expect(mockGetToken).toHaveBeenCalledTimes(3);
        expect(RestApiClient.get).toHaveBeenCalledWith("/tokens/test_token");
        expect(result.current).toBe("test_token");
    });

    test("should prompt the user to authorize if no token is returned", async () => {
        (t.popup as jest.Mock).mockResolvedValue(undefined);
        const mockGetToken = jest
            .fn()
            .mockResolvedValueOnce(undefined)
            .mockResolvedValueOnce(undefined)
            .mockResolvedValue("test_token");
        (t.getRestApi as jest.Mock).mockResolvedValue({ getToken: mockGetToken });

        const { result, waitForNextUpdate } = renderHook(() => useTrelloToken(t));
        await waitForNextUpdate();
        expect(t.getRestApi).toHaveBeenCalledTimes(1);
        expect(mockGetToken).toHaveBeenCalledTimes(3);
        expect(RestApiClient.get).not.toHaveBeenCalled();
        expect(t.popup).toHaveBeenCalledWith({
            title: "Authorize Trello REST API",
            url: "./auth.html",
            height: 150,
        });
        expect(result.current).toBe("test_token");
    });

    test("should clear the current token and prompt the user to authorize if token has expired", async () => {
        (t.popup as jest.Mock).mockResolvedValue(undefined);
        const mockGetToken = jest
            .fn()
            .mockResolvedValueOnce("test_token")
            .mockResolvedValueOnce(undefined)
            .mockResolvedValue("test_token2");
        const mockClearToken = jest.fn().mockReturnValue(undefined);
        (t.getRestApi as jest.Mock).mockResolvedValue({ getToken: mockGetToken, clearToken: mockClearToken });
        RestApiClient.get.mockResolvedValue({ dateExpires: Date.now() - 60 });

        const { result, waitForNextUpdate } = renderHook(() => useTrelloToken(t));
        await waitForNextUpdate();
        expect(t.getRestApi).toHaveBeenCalledTimes(1);
        expect(mockGetToken).toHaveBeenCalledTimes(3);
        expect(mockClearToken).toHaveBeenCalledTimes(1);
        expect(RestApiClient.get).toHaveBeenCalledWith("/tokens/test_token");
        expect(t.popup).toHaveBeenCalledWith({
            title: "Authorize Trello REST API",
            url: "./auth.html",
            height: 150,
        });
        expect(result.current).toBe("test_token2");
    });

    test("should clear the current token return undefined on error", async () => {
        (t.popup as jest.Mock).mockResolvedValue(undefined);
        const mockGetToken = jest.fn().mockResolvedValueOnce("test_token").mockResolvedValue(undefined);
        const mockClearToken = jest.fn().mockReturnValue(undefined);
        (t.getRestApi as jest.Mock).mockResolvedValue({ getToken: mockGetToken, clearToken: mockClearToken });
        RestApiClient.get.mockRejectedValue("Some error.");

        const { result, waitForNextUpdate } = renderHook(() => useTrelloToken(t));
        await waitForNextUpdate();
        expect(t.getRestApi).toHaveBeenCalledTimes(1);
        expect(mockGetToken).toHaveBeenCalledTimes(2);
        expect(mockClearToken).toHaveBeenCalledTimes(1);
        expect(RestApiClient.get).toHaveBeenCalledWith("/tokens/test_token");
        expect(t.popup).not.toHaveBeenCalled();
        expect(result.current).toBe(undefined);
    });
});
