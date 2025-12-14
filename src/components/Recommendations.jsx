import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { generateRecommendations } from "../utils/generateRecommendations";

export default function Recommendations({ sessions, goals }) {
    const recs = generateRecommendations(sessions, goals);

    return (
        <div style={{ marginTop: "20px" }}>
            <Typography variant="h5" gutterBottom>
                Рекомендации на основе ваших данных
            </Typography>

            <Paper style={{ padding: "20px", background: "#262626" }}>
                <List>
                    {recs.map((r, i) => (
                        <ListItem key={i} style={{ color: "white", marginBottom: "10px" }}>
                            • {r}
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
}
