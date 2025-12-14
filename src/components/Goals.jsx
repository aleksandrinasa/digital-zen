import React, { useState } from "react";
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Grid,
    MenuItem,
} from "@mui/material";

export default function Goals({ onCreate }) {
    const [goal, setGoal] = useState({
        app: "",
        weeklyLimit: "",
        description: "",
    });

    const apps = [
        "YouTube",
        "TikTok",
        "Instagram",
        "Telegram",
        "VK",
        "Chrome",
        "WhatsApp",
        "Discord",
        "Steam",
        "Игры",
    ];

    const handleCreate = () => {
        if (!goal.app || !goal.weeklyLimit) {
            alert("Заполните приложение и лимит!");
            return;
        }
        onCreate(goal);
        setGoal({ app: "", weeklyLimit: "", description: "" });
    };

    return (
        <Card elevation={3} sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>
                    Создать новую цель
                </Typography>

                <Grid container spacing={2}>
                    {/* Выбор приложения */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            select
                            fullWidth
                            label="Приложение"
                            value={goal.app}
                            onChange={(e) => setGoal({ ...goal, app: e.target.value })}
                        >
                            {apps.map((a) => (
                                <MenuItem key={a} value={a}>
                                    {a}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Недельный лимит */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Лимит в неделю (мин)"
                            type="number"
                            value={goal.weeklyLimit}
                            onChange={(e) =>
                                setGoal({ ...goal, weeklyLimit: e.target.value })
                            }
                        />
                    </Grid>

                    {/* Описание */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Описание (необязательно)"
                            value={goal.description}
                            onChange={(e) =>
                                setGoal({ ...goal, description: e.target.value })
                            }
                        />
                    </Grid>

                    {/* Кнопка */}
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleCreate}>
                            Добавить цель
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
