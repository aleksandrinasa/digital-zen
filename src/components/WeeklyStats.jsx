import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

// Функция группировки за последние 7 дней
function groupLastWeek(sessions) {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    const summary = {};

    sessions.forEach((s) => {
        const date = new Date(s.date);
        if (date >= weekAgo && date <= now) {
            const app = s.app_name || s.appName || "Unknown";
            const dur = Number(s.duration_min || s.duration || 0);

            if (!summary[app]) summary[app] = 0;
            summary[app] += dur;
        }
    });

    return Object.entries(summary).map(([app, total]) => ({
        app,
        total,
    }));
}

export default function WeeklyStats({ sessions }) {
    const data = groupLastWeek(sessions);

    if (!data.length)
        return <p>Нет данных за последние 7 дней. Загрузите CSV.</p>;

    return (
        <div style={{ marginTop: "20px" }}>
            <h3>Статистика за неделю</h3>

            {/* Диаграмма */}
            <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="app" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" />
            </BarChart>

            {/* Таблица */}
            <table border="1" cellPadding="6" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Приложение</th>
                        <th>Время за неделю (мин)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                        <tr key={i}>
                            <td>{d.app}</td>
                            <td>{d.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
