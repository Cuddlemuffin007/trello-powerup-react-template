import { renderHook } from "@testing-library/react-hooks";

import { useCardInfo } from "../../src/hooks/useCardInfo";

import { t } from "../helpers";

describe("useCardInfo hook", () => {
    it("should fetch the current cards information", async () => {
        (t.card as jest.Mock).mockResolvedValue({
            id: "cardId",
            labels: [],
            members: [],
            shortLink: "shortUrl",
        });
        const { result, waitForNextUpdate } = renderHook(() => useCardInfo(t));
        await waitForNextUpdate();
        expect(t.card).toHaveBeenCalledWith("all");
        expect(result.current.data).toStrictEqual({
            id: "cardId",
            labels: [],
            members: [],
            shortLink: "shortUrl",
        });
        expect(result.current.error).toStrictEqual(null);
    });

    it("should query only the specified fields if provided", async () => {
        (t.card as jest.Mock).mockResolvedValue({
            id: "cardId",
            labels: [],
            members: [],
        });
        const { result, waitForNextUpdate } = renderHook(() => useCardInfo(t, "id", "labels", "members"));
        await waitForNextUpdate();
        expect(t.card).toHaveBeenCalledWith("id", "labels", "members");
        expect(result.current.data).toStrictEqual({
            id: "cardId",
            labels: [],
            members: [],
        });
        expect(result.current.error).toStrictEqual(null);
    });

    it("should return the error encountered if there is an error", async () => {
        (t.card as jest.Mock).mockRejectedValue("Some exception");
        const { result, waitForNextUpdate } = renderHook(() => useCardInfo(t));
        await waitForNextUpdate();
        expect(t.card).toHaveBeenCalledWith("all");
        expect(result.current.data).toStrictEqual(null);
        expect(result.current.error).toStrictEqual("Some exception");
    });
});
