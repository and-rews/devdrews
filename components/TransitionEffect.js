import { AnimatePresence, motion } from "framer-motion";

const TransitionEffect = ({ children }) => {
  return (
    <AnimatePresence initial={true}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3 }}
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, #00000054, #0E4B0021)",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionEffect;
