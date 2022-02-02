import React from "react";
import { Button, Message, Segment } from "semantic-ui-react";

import { useProvidedTrello } from "../../hooks";
import config from "../../config";

export const Auth = (): JSX.Element => {
    const t = useProvidedTrello();

    const handleAuthorize = async () => {
        const {
            trello: { tokenExpiration },
        } = config;
        await t.getRestApi().authorize({ scope: "read,write", expiration: tokenExpiration });
    };

    return (
        <Segment textAlign="center">
            <Message info content="Authorize your Trello account to continue." />
            <Button color="blue" content="Authorize" onClick={handleAuthorize} />
        </Segment>
    );
};
