import React from "react";
import { parseCSV } from "../utils/parseCSV";
import { normalizeSessions } from "../utils/normalizeSessions";
import Button from "@mui/material/Button";

export default function UploadCSV({ onData }) {
    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const raw = await parseCSV(file);
        const normalized = normalizeSessions(raw);

        onData(normalized);
    };

    return (
        <div>
            <Button variant="contained" color="primary" component="label">
                Загрузить CSV
                <input type="file" hidden accept=".csv" onChange={handleFile} />
            </Button>
        </div>
    );
}
