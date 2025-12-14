// Модуль рекомендаций для Digital Zen
// Анализирует: превышение лимитов, частое использование, активность за неделю

export function generateRecommendations(sessions, goals) {
    const recs = [];

    if (!sessions.length) {
        return ["Загрузите данные, чтобы получить рекомендации."];
    }

    // ---- 1. Превышение лимитов ----
    goals.forEach((goal) => {
        const today = new Date().toISOString().split("T")[0];
        const totalToday = sessions
            .filter((s) => s.date === today && s.app_name === goal.appName)
            .reduce((sum, s) => sum + Number(s.duration_min), 0);

        if (totalToday > goal.dailyLimit) {
            recs.push(
                `Вы превысили лимит в ${goal.appName}: потрачено ${totalToday} мин при лимите ${goal.dailyLimit}. Рекомендуем включить фокус-режим минимум на 20 минут.`
            );
        }
    });

    // ---- 2. Наиболее часто используемое приложение ----
    const freq = {};
    sessions.forEach((s) => {
        freq[s.app_name] = (freq[s.app_name] || 0) + Number(s.duration_min);
    });

    const topApp = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];
    if (topApp) {
        const [app, minutes] = topApp;
        recs.push(`Самое используемое приложение за последние дни — ${app}: ${minutes} минут. Рекомендуется сократить использование на 10–15% и выключить push-уведомления.`);
    }

    // ---- 3. Совет по общей цифровой гигиене ----
    recs.push(
        "Рекомендуется делать 5-минутный цифровой перерыв каждый час активности, чтобы снизить нагрузку на зрение и мозг."
    );

    // ---- 4. Совет по социальным сетям ----
    if (freq["Instagram"] > 60 || freq["TikTok"] > 60) {
        recs.push("Вы проводите много времени в социальных сетях. Попробуйте ограничить вход в соцсети до 2–3 раз в день.");
    }

    // ---- 5. Совет по YouTube ----
    if (freq["YouTube"] > 90) {
        recs.push("YouTube занимает значительную часть вашего времени. Попробуйте смотреть видео на скорости 1.25 — это экономит около 20% времени.");
    }

    if (!recs.length) {
        return ["Отличная работа! Пока не найдено областей, требующих улучшения."];
    }

    return recs;
}
