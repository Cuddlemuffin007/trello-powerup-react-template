import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import { PowerUpRoutes } from "./components/PowerUpRoutes";
import { TrelloProvider } from "./components/TrelloProvider";
import { useTrelloApi } from "./hooks";

export const PowerUpRouter = (): JSX.Element => {
    const t = useTrelloApi();

    return (
        <TrelloProvider t={t}>
            <Suspense fallback={<Segment loading></Segment>}>
                <Router basename={process.env.CONTEXT_PATH}>
                    <PowerUpRoutes />
                </Router>
            </Suspense>
        </TrelloProvider>
    );
};
