import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from "@mui/material";

export default function SessionsTable({ sessions }) {
    if (!sessions.length) {
        return (
            <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                sx={{ mt: 2 }}
            >
                Загрузите CSV, чтобы увидеть данные.
            </Typography>
        );
    }

    return (
        <Box>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Загруженные сессии
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Дата</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Приложение</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Категория</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Длительность (мин)</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {sessions.map((s, i) => (
                            <TableRow key={i} hover>
                                <TableCell>{s.date}</TableCell>
                                <TableCell>{s.app}</TableCell>
                                <TableCell>{s.category}</TableCell>
                                <TableCell>{s.duration}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
