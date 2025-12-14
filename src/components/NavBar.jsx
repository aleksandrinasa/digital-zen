import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function NavBar({ page, setPage }) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Tabs
                value={page}
                onChange={(e, v) => setPage(v)}
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab value="data" label="Данные" />
                <Tab value="stats" label="Статистика" />
                <Tab value="goals" label="Цели" />
            </Tabs>
        </Box>
    );
}
