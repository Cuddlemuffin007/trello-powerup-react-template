import { useState, useEffect } from "react";

import { Trello } from "../@types/trello";

const _authorize = async (t: Trello.PowerUp.IFrame) => {
    await t.popup({
        title: "Authorize Trello REST API",
        url: "./auth.html",
        height: 150,
    });
};

export const useTrelloToken = (t: Trello.PowerUp.IFrame): string | null | undefined => {
    const [token, setToken] = useState<string | null | undefined>(null);

    useEffect(() => {
        const checkToken = async (_t: Trello.PowerUp.IFrame) => {
            const restApi = await _t.getRestApi();
            const token = await restApi.getToken();
            try {
                if (token) {
                    const { dateExpires } = (await window.Trello.get(`/tokens/${token}`)) as { dateExpires: number };
                    if (dateExpires && new Date(dateExpires).valueOf() < Date.now()) {
                        await restApi.clearToken();
                    }
                }
                if (!(await restApi.getToken())) {
                    await _authorize(t);
                }
            } catch (error) {
                await restApi.clearToken();
            } finally {
                setToken(await restApi.getToken());
            }
        };
        checkToken(t);
    }, [t]);

    return token;
};
