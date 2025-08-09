import { motion } from "framer-motion";

export default function TimeInput({ label, value, onChange }) {
  return (
    <motion.div
      className="time-input"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <label>{label}</label>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </motion.div>
  );
}
