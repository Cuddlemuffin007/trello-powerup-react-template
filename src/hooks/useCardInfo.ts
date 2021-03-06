import { useEffect, useState } from "react";

import { Trello } from "../@types/trello";

interface UseCardInfoResult {
    data: Partial<Trello.PowerUp.Card> | null;
    error: Error | null;
}

type CardField = keyof Trello.PowerUp.Card;

export const useCardInfo = (t: Trello.PowerUp.IFrame, ...fields: CardField[]): UseCardInfoResult => {
    const [data, setData] = useState<UseCardInfoResult["data"]>(null);
    const [error, setError] = useState<UseCardInfoResult["error"]>(null);

    if (!fields.length) fields = ["all" as CardField];

    useEffect(() => {
        const getCardInfo = async (_t: Trello.PowerUp.IFrame) => {
            try {
                const _data = await _t.card(...fields);
                setData(_data);
            } catch (error) {
                setError(error as Error);
            } finally {
            }
        };
        getCardInfo(t);
    }, [t]);

    return { data, error };
};
