import React from "react";
import {
    Card,
    CardContent,
    Typography,
    LinearProgress,
    Grid,
    Box,
} from "@mui/material";

export default function GoalsList({ goals, sessions }) {
    if (!goals.length) {
        return (
            <Typography variant="body1" color="text.secondary" textAlign="center">
                Пока нет целей.
            </Typography>
        );
    }

    // Группировка времени по приложению (за последние 7 дней)
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const weeklyUsage = {};
    sessions.forEach((s) => {
        const date = new Date(s.date);
        if (date >= weekAgo) {
            if (!weeklyUsage[s.app]) weeklyUsage[s.app] = 0;
            weeklyUsage[s.app] += s.duration;
        }
    });

    return (
        <Grid container spacing={3}>
            {goals.map((g, i) => {
                const used = weeklyUsage[g.app] || 0;
                const progress = Math.min(100, Math.round((used / g.weeklyLimit) * 100));

                return (
                    <Grid item xs={12} md={6} key={i}>
                        <Card elevation={3} sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight={600}>
                                    {g.app}
                                </Typography>

                                <Typography color="text.secondary" sx={{ mb: 1 }}>
                                    Лимит: {g.weeklyLimit} мин / Неделя
                                </Typography>

                                {g.description && (
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        {g.description}
                                    </Typography>
                                )}

                                <Typography variant="body2" fontWeight={500}>
                                    Использовано: {used} мин
                                </Typography>

                                <Box sx={{ mt: 1 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={progress}
                                        sx={{ height: 10, borderRadius: 5 }}
                                    />
                                </Box>

                                <Typography
                                    variant="body2"
                                    color={progress > 100 ? "error" : "text.secondary"}
                                    sx={{ mt: 1 }}
                                >
                                    {progress}% выполнено
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}
