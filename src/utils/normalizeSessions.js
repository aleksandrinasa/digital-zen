/**
 * normalizeSessions(rawRows)
 * Приводит сырые строки CSV к единому формату:
 * { date: "YYYY-MM-DD", app_name: "YouTube", duration_min: 40 }
 *
 * Поддерживает разные варианты названий колонок:
 * date, Date, Дата
 * appName, app_name, app, application, Приложение
 * duration, duration_min, minutes, Длительность, "Длительность (мин)"
 *
 * Если поле не найдено — подставляется "Unknown App" / 0
 */

const dateKeys = ["date", "Date", "Дата", "дата"];
const appKeys = ["appName", "app_name", "app", "application", "Приложение", "приложение", "App", "application_name"];
const durationKeys = ["duration", "duration_min", "minutes", "Minutes", "Длительность", "Длительность (мин)", "duration(min)", "duration (min)", "minutes_per_day", "Minutes"];

function pickField(obj, candidates) {
    for (const k of candidates) {
        if (Object.prototype.hasOwnProperty.call(obj, k)) {
            return obj[k];
        }
    }
    // try lowercase match
    const keys = Object.keys(obj);
    for (const k of keys) {
        const lk = k.toLowerCase().replace(/\s+/g, "");
        for (const cand of candidates) {
            const lc = String(cand).toLowerCase().replace(/\s+/g, "");
            if (lk === lc) return obj[k];
            // also allow partial match like "длительность(мин)" vs "длительность (мин)"
            if (lk.indexOf(lc) !== -1 || lc.indexOf(lk) !== -1) return obj[k];
        }
    }
    return undefined;
}

function normalizeDate(value) {
    if (!value) return "";
    // Если уже в формате YYYY-MM-DD — вернуть как есть
    const isoMatch = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) return isoMatch[0];

    // поддержка форматов DD.MM.YYYY или DD/MM/YYYY
    const dmy = String(value).trim();
    const m1 = dmy.match(/^(\d{2})[.\-/](\d{2})[.\-/](\d{4})/);
    if (m1) {
        return `${m1[3]}-${m1[2]}-${m1[1]}`;
    }

    // попытка создания даты через Date
    const dt = new Date(value);
    if (!isNaN(dt.getTime())) {
        const y = dt.getFullYear();
        const m = String(dt.getMonth() + 1).padStart(2, "0");
        const d = String(dt.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    }

    return String(value); // fallback — отдать как есть
}

export function normalizeSessions(rawRows) {
    if (!Array.isArray(rawRows)) return [];

    const normalized = rawRows.map((row) => {
        // row may have keys with BOM or spaces — we rely on pickField
        const dateRaw = pickField(row, dateKeys) ?? pickField(row, ["date", "Дата", "Date"]);
        const appRaw = pickField(row, appKeys);
        const durationRaw = pickField(row, durationKeys);

        const date = normalizeDate(dateRaw);
        const app_name = (appRaw || "").toString().trim() || "Unknown App";

        // Try to parse numbers from strings like "40" or "40.0" or "40 мин"
        let duration_min = 0;
        if (typeof durationRaw === "number") duration_min = durationRaw;
        else if (typeof durationRaw === "string") {
            const m = durationRaw.match(/-?\d+(\.\d+)?/);
            duration_min = m ? Number(m[0]) : 0;
        } else {
            duration_min = 0;
        }

        // Final normalization - ensure integers and non-negative
        duration_min = Math.max(0, Math.round(duration_min));

        return {
            date,
            app_name,
            duration_min,
            // keep original row for debugging if needed
            __raw: row,
        };
    });

    return normalized;
}
