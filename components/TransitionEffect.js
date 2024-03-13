import { AnimatePresence, motion } from "framer-motion";

const TransitionEffect = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, black, #062200)",
        }}
        onAnimationComplete={() => {
          document.querySelector(".overlay").style.transition = "none";
        }}
        className="overlay"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionEffect;
