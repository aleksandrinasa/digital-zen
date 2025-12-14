import React from "react";
import Button from "@mui/material/Button";

export default function Layout({ current, setCurrent }) {
    const tabs = [
        { key: "data", label: "Данные" },
        { key: "stats", label: "Статистика" },
        { key: "week", label: "Неделя" },
        { key: "goals", label: "Цели" },
        { key: "recs", label: "Рекомендации" }
    ];

    return (
        <div style={{ marginBottom: "20px" }}>
            {tabs.map((t) => (
                <Button
                    key={t.key}
                    variant={current === t.key ? "contained" : "outlined"}
                    color="primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => setCurrent(t.key)}
                >
                    {t.label}
                </Button>
            ))}
        </div>
    );
}
