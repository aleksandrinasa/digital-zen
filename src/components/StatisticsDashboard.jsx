import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Paper,
} from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";

export default function StatisticsDashboard({ sessions }) {
    if (!sessions.length) {
        return (
            <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                sx={{ mt: 2 }}
            >
                Загрузите данные, чтобы увидеть статистику.
            </Typography>
        );
    }

    // ---- Группировка по приложениям ----
    const usageByApp = {};
    sessions.forEach((s) => {
        if (!usageByApp[s.app]) usageByApp[s.app] = 0;
        usageByApp[s.app] += s.duration;
    });

    const appChartData = Object.entries(usageByApp).map(([app, duration]) => ({
        app,
        duration,
    }));

    // ---- Группировка по дням ----
    const usageByDate = {};
    sessions.forEach((s) => {
        if (!usageByDate[s.date]) usageByDate[s.date] = 0;
        usageByDate[s.date] += s.duration;
    });

    const dateChartData = Object.entries(usageByDate).map(([date, duration]) => ({
        date,
        duration,
    }));

    // ---- Топ-1 приложение ----
    const mostUsedApp = appChartData.sort((a, b) => b.duration - a.duration)[0];

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Аналитика использования
            </Typography>

            {/* Основные карточки */}
            <Grid container spacing={3}>

                {/* Карточка: всего времени */}
                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                                Общее экранное время
                            </Typography>
                            <Typography variant="h4" fontWeight={700} mt={1}>
                                {sessions.reduce((sum, s) => sum + s.duration, 0)} мин
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Карточка: количество сессий */}
                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                                Количество сессий
                            </Typography>
                            <Typography variant="h4" fontWeight={700} mt={1}>
                                {sessions.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Карточка: самое частое приложение */}
                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                                Самое частое приложение
                            </Typography>
                            <Typography variant="h5" fontWeight={700} mt={1}>
                                {mostUsedApp?.app}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {mostUsedApp?.duration} мин
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Графики */}
            <Grid container spacing={3} sx={{ mt: 1 }}>

                {/* Бар-чарт по приложениям */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ borderRadius: 3, p: 2, height: 350 }}>
                        <Typography variant="h6" mb={1}>
                            Использование по приложениям
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={appChartData}>
                                <XAxis dataKey="app" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="duration" fill="#1976d2" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Линейный график по дням */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ borderRadius: 3, p: 2, height: 350 }}>
                        <Typography variant="h6" mb={1}>
                            Использование по дням
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dateChartData}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="duration" stroke="#1976d2" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
