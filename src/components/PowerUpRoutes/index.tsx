import React from "react";
import { Routes, Route } from "react-router-dom";
import { Message } from "semantic-ui-react";

import { Auth } from "../Auth";
import { CardButton } from "../../card-button/CardButton";

export const PowerUpRoutes = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<Message compact info content="Nothing to see here!" />} />
            <Route path="/card-button.html" element={<CardButton />} />
            <Route path="/auth.html" element={<Auth />} />
        </Routes>
    );
};
