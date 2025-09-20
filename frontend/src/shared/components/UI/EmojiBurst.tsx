import { motion, AnimatePresence } from "framer-motion";

const EMOJIS = ["💌", "🤫", "✨", "😎", "🔥"];

type EmojiBurstProps = {
  triggerKey: number; // change this number to trigger burst
};

const EmojiBurst: React.FC<EmojiBurstProps> = ({ triggerKey }) => {
  return (
    <AnimatePresence>
      {triggerKey > 0 && (
        <>
          {EMOJIS.map((emoji, i) => (
            <motion.span
              key={`${triggerKey}-${i}`}
              className="absolute left-1/2 text-2xl"
              initial={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
              animate={{
                opacity: 0,
                y: -100 - Math.random() * 50,
                x: (Math.random() - 0.5) * 150,
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {emoji}
            </motion.span>
          ))}
        </>
      )}
    </AnimatePresence>
  );
};

export default EmojiBurst;
