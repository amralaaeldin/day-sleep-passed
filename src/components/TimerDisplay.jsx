import { motion } from "framer-motion";

function formatTime(ms) {
  if (ms === null) return "--:--:--";
  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

// Check if now is within wake→sleep range
function isAwake(nowMins, wakeMins, sleepMins) {
  if (wakeMins == null || sleepMins == null) return true;
  if (wakeMins === sleepMins) return true;
  if (sleepMins > wakeMins) {
    return nowMins >= wakeMins && nowMins < sleepMins;
  } else {
    return nowMins >= wakeMins || nowMins < sleepMins;
  }
}

export default function TimerDisplay({
  diffHours,
  timeToSleep,
  timeFromWake,
  wakeTime,
  sleepTime
}) {
  // Convert "HH:MM" → total minutes
  const parseHM = (t) => {
    if (!t) return null;
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const wakeMins = parseHM(wakeTime);
  const sleepMins = parseHM(sleepTime);

  const awake = isAwake(nowMins, wakeMins, sleepMins);

  return (
    <motion.div
      className="timer-display"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ position: "relative" }}
    >
      {awake ? (
        <>
          <p>Wake → Sleep Duration: {diffHours.toFixed(1)} hrs</p>
          <p>Time until Sleep: {formatTime(timeToSleep)}</p>
          <p className="wake">Time since Wake: {formatTime(timeFromWake)}</p>
        </>
      ) : (<span>
        💤💤💤
      </span>)}
    </motion.div>
  );
}
