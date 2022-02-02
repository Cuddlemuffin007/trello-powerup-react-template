import { renderHook } from "@testing-library/react-hooks";

import { TrelloProviderProps } from "../../src/@types";
import { TrelloProvider } from "../../src/components/TrelloProvider";
import { useProvidedTrello } from "../../src/hooks/useProvidedTrello";

import { t, TrelloPowerUp } from "../helpers";

describe("useProvidedTrello hook", () => {
    it("should use the provided trello powerup iframe object", () => {
        const wrapper = ({ children }: TrelloProviderProps): JSX.Element => {
            return TrelloProvider({ t, children });
        };
        const { result } = renderHook(() => useProvidedTrello(), { wrapper });
        expect(result.current).toBe(t);
        expect(TrelloPowerUp.iframe).not.toHaveBeenCalled();
    });

    it("should create a trello powerup iframe object if none is provided", () => {
        const wrapper = ({ children }: TrelloProviderProps): JSX.Element => {
            return TrelloProvider({ children } as TrelloProviderProps);
        };
        const { result } = renderHook(() => useProvidedTrello(), { wrapper });
        expect(result.current).not.toBe(t);
        expect(TrelloPowerUp.iframe).toHaveBeenCalledWith({ appKey: "test_app_key", appName: "Trello PowerUp React" });
    });
});
