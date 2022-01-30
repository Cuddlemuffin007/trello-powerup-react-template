import React from "react";
import { Routes, Route } from "react-router-dom";

import { CardButton } from "../../card-button/CardButton";

export const PowerUpRoutes = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/card-button.html" element={<CardButton />} />
        </Routes>
    );
};
