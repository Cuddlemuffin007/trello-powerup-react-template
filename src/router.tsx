import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import { CardButton } from "./card-button/CardButton";
import { TrelloProvider } from "./components/TrelloProvider";

const t = window.TrelloPowerUp.iframe();

export const PowerUpRouter = (): JSX.Element => {
    return (
        <div>
            <TrelloProvider t={t}>
                <Suspense fallback={<Segment loading></Segment>}>
                    <Router basename={process.env.CONTEXT_PATH || undefined}>
                        <Routes>
                            <Route path="/card-button.html" element={<CardButton />} />
                        </Routes>
                    </Router>
                </Suspense>
            </TrelloProvider>
        </div>
    );
};
