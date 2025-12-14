import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Paper,
    Button,
} from "@mui/material";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function HomeDashboard({ sessions, setPage }) {
    if (!sessions.length) {
        return (
            <Box textAlign="center" sx={{ mt: 4 }}>
                <Typography variant="h6" mb={2}>
                    Добро пожаловать в Digital Zen 👋
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                    Загрузите CSV-файл, чтобы увидеть аналитику, цели и рекомендации.
                </Typography>
                <Button variant="contained" onClick={() => setPage("data")}>
                    Загрузить данные
                </Button>
            </Box>
        );
    }

    // ---- Данные за сегодня ----
    const today = new Date().toISOString().split("T")[0];
    const todaySessions = sessions.filter((s) => s.date === today);
    const totalToday = todaySessions.reduce((sum, s) => sum + s.duration, 0);

    // ---- Топ-3 приложений ----
    const usageByApp = {};
    todaySessions.forEach((s) => {
        if (!usageByApp[s.app]) usageByApp[s.app] = 0;
        usageByApp[s.app] += s.duration;
    });

    const topApps = Object.entries(usageByApp)
        .map(([app, duration]) => ({ app, duration }))
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 3);

    // ---- Данные для графика ----
    const chartData = topApps.map((t) => ({
        app: t.app,
        duration: t.duration,
    }));

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Сегодняшнее резюме
            </Typography>

            <Grid container spacing={3}>
                {/* Карточка: экранное время сегодня */}
                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography color="text.secondary">Экранное время</Typography>
                            <Typography variant="h4" fontWeight={700} mt={1}>
                                {totalToday} мин
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Карточка: количество сессий */}
                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography color="text.secondary">Количество сессий</Typography>
                            <Typography variant="h4" fontWeight={700} mt={1}>
                                {todaySessions.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Карточка: топ приложение */}
                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography color="text.secondary">Самое частое сегодня</Typography>
                            <Typography variant="h5" fontWeight={700} mt={1}>
                                {topApps[0]?.app || "—"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {topApps[0]?.duration || 0} мин
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* График топ-3 */}
            {topApps.length > 0 && (
                <Paper
                    elevation={3}
                    sx={{ borderRadius: 3, p: 2, mt: 3, height: 350 }}
                >
                    <Typography variant="h6" mb={1}>
                        Топ-3 приложений сегодня
                    </Typography>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="app" />
                            <Tooltip />
                            <Bar dataKey="duration" fill="#1976d2" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            )}

            {/* Быстрые действия */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                    Быстрое управление
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => setPage("stats")}
                        >
                            Перейти к аналитике
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => setPage("goals")}
                        >
                            Управлять целями
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => setPage("data")}
                        >
                            Загрузить новые данные
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
