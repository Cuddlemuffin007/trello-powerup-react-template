// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Trello } from "../src/@types/trello";

export const RestApiClient = {
    authorize: jest.fn().mockResolvedValue(undefined),
    getToken: jest.fn(),
    setToken: jest.fn().mockResolvedValue(undefined),
    clearToken: jest.fn().mockResolvedValue(undefined),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    del: jest.fn(),
    delete: jest.fn(),
    signUrl: jest.fn(),
};

export const t: Trello.PowerUp.IFrame = {
    get: jest.fn(),
    set: jest.fn().mockResolvedValue(undefined),
    card: jest.fn(),
    member: jest.fn().mockResolvedValue({ id: "memberID" }),
    remove: jest.fn(),
    loadSecret: (key: string): Promise<string> => Promise.resolve(`${key}TestSecret`),
    storeSecret: jest.fn().mockResolvedValue(undefined),
    render: (cb: () => void): void => cb(),
    authorize: jest.fn().mockResolvedValue("token"),
    popup: jest.fn(),
    closePopup: jest.fn(),
    signUrl: jest.fn().mockReturnValue("signed-url"),
    sizeTo: jest.fn(),
    getRestApi: jest.fn(),
};

export const TrelloPowerUp: Trello.PowerUp = {
    initialize: jest.fn(),
    iframe: jest.fn().mockReturnValue(t),
};

export const flushPromises = (): Promise<void> => new Promise(setImmediate);
