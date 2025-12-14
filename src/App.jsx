import { useState, useEffect } from "react";

// Компоненты
import Layout from "./components/Layout";
import UploadCSV from "./components/UploadCSV";
import SessionsTable from "./components/SessionsTable";
import StatisticsDashboard from "./components/StatisticsDashboard";
import Goals from "./components/Goals";
import GoalsList from "./components/GoalsList";
import HomeDashboard from "./components/HomeDashboard";

// Firebase API
import { saveSessions } from "./firebase/sessionsApi";
import { loadSessions } from "./firebase/loadSessions";
import { saveGoal } from "./firebase/goalsApi";
import { loadGoals } from "./firebase/loadGoals";
import { clearAllUserData } from "./firebase/adminTools";

// Material UI
import { Button, Box } from "@mui/material";

function App() {
  const [sessions, setSessions] = useState([]);
  const [goals, setGoals] = useState([]);

  // Страница по умолчанию — главная
  const [page, setPage] = useState("home");

  // Загружаем данные при старте приложения
  useEffect(() => {
    async function load() {
      const sessionData = await loadSessions("demo-user");
      setSessions(sessionData);

      const goalsData = await loadGoals("demo-user");
      setGoals(goalsData);
    }

    load();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Digital Zen</h1>

      {/* Навигация */}
      <Layout current={page} setCurrent={setPage} />

      {/* Кнопка очистки Firestore */}
      <Box sx={{ textAlign: "right", mb: 2 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={async () => {
            if (confirm("Удалить все данные?")) {
              await clearAllUserData("demo-user");
              alert("Все данные удалены!");
              setSessions([]);
              setGoals([]);
            }
          }}
        >
          Очистить Firestore
        </Button>
      </Box>

      {/* Главная */}
      {page === "home" && (
        <HomeDashboard sessions={sessions} setPage={setPage} />
      )}

      {/* Раздел: Данные */}
      {page === "data" && (
        <>
          <UploadCSV
            onData={async (data) => {
              setSessions(data);
              await saveSessions("demo-user", data);
              alert("Данные сохранены в Firestore!");
            }}
          />
          <SessionsTable sessions={sessions} />
        </>
      )}

      {/* Раздел: Статистика */}
      {page === "stats" && (
        <StatisticsDashboard sessions={sessions} />
      )}

      {/* Раздел: Цели */}
      {page === "goals" && (
        <>
          <Goals
            onCreate={async (goal) => {
              await saveGoal("demo-user", goal);
              alert("Цель сохранена!");

              const goalsData = await loadGoals("demo-user");
              setGoals(goalsData);
            }}
          />

          {/* Список целей с прогрессом */}
          <GoalsList goals={goals} sessions={sessions} />
        </>
      )}
    </div>
  );
}

export default App;
