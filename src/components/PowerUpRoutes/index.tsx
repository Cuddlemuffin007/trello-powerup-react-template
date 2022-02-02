import React from "react";
import { Routes, Route } from "react-router-dom";

import { Auth } from "../Auth";
import { CardButton } from "../../card-button/CardButton";

export const PowerUpRoutes = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/card-button.html" element={<CardButton />} />
            <Route path="/auth.html" element={<Auth />} />
        </Routes>
    );
};
