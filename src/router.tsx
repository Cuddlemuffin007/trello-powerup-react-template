import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import { PowerUpRoutes } from "./components/PowerUpRoutes";
import { TrelloProvider } from "./components/TrelloProvider";

const t = window.TrelloPowerUp.iframe();

export const PowerUpRouter = (): JSX.Element => {
    return (
        <TrelloProvider t={t}>
            <Suspense fallback={<Segment loading></Segment>}>
                <Router basename={process.env.CONTEXT_PATH || undefined}>
                    <PowerUpRoutes />
                </Router>
            </Suspense>
        </TrelloProvider>
    );
};
