import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import TimeInput from "./components/TimeInput";
import TimerDisplay from "./components/TimerDisplay";
import Background from "./components/Background";
import "./App.css";

export default function App() {
  const [wakeTime, setWakeTime] = useState(localStorage.getItem("wakeTime") || "05:30");
  const [sleepTime, setSleepTime] = useState(localStorage.getItem("sleepTime") || "22:00");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWakeChange = (value) => {
    setWakeTime(value);
    localStorage.setItem("wakeTime", value);
  };

  const handleSleepChange = (value) => {
    setSleepTime(value);
    localStorage.setItem("sleepTime", value);
  };

  const parseTime = (timeStr) => {
    if (!timeStr) return null;
    const [h, m] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);
    return date;
  };

  const wakeDate = parseTime(wakeTime);
  const sleepDate = parseTime(sleepTime);

  const diffHours = wakeDate && sleepDate
    ? ((sleepDate - wakeDate) / 3600000 + 24) % 24
    : null;

  const timeToSleep = sleepDate
    ? ((sleepDate - now + 86400000) % 86400000)
    : null;

  const timeFromWake = wakeDate
    ? ((now - wakeDate + 86400000) % 86400000)
    : null;

  return (
    <div className="app">
      <Background isDay={now.getHours() >= 6 && now.getHours() < 18} />

      <motion.div
        className="content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="title">
          {now.getHours() >= 6 && now.getHours() < 18 ? <Sun size={36} /> : <Moon size={36} />}  
          Wake & Sleep Tracker
        </h1>

        <div className="inputs">
          <TimeInput label="Wake Time" value={wakeTime} onChange={handleWakeChange} />
          <TimeInput label="Sleep Time" value={sleepTime} onChange={handleSleepChange} />
        </div>

        {diffHours !== null && (
          <TimerDisplay
            diffHours={diffHours}
            timeToSleep={timeToSleep}
            timeFromWake={timeFromWake}
            wakeTime={wakeTime}
            sleepTime={sleepTime}
          />
        )}
      </motion.div>
    </div>
  );
}
