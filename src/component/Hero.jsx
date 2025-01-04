import './cssfiles/hero.css';
import { motion } from "framer-motion"; // Ensure to use framer-motion correctly

const Hero = () => {
  // Define the bounce animation for each letter
  const bounce = {
    initial: { y: -100 }, // Start from a higher position (y = -100)
    whileInView: { y: 0 }, // Smoothly come to their final position (y = 0)
    transition: { duration: 1, ease: "easeOut" }, // Duration and smooth easing for the animation
  };

  return (
    <div className="hero">
      <div className="heromain">
        <div className="firsthero">
          {/* First letter (W) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5 }} // 1.5 sec delay for first letter
            className="w"
            {...bounce} // Apply bounce effect
          >
            W
          </motion.div>

          {/* Second letter (E) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.8 }} // 1.8 sec delay for second letter
            className="e"
            {...bounce}
          >
            E
          </motion.div>

          {/* Third letter (L) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.9 }} // 1.9 sec delay for third letter
            className="l"
            {...bounce}
          >
            L
          </motion.div>

          {/* Fourth letter (C) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 2 }} // 2 sec delay for fourth letter
            className="c"
            {...bounce}
          >
            C
          </motion.div>

          {/* Fifth letter (O) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 2.3 }} // 2.3 sec delay for fifth letter
            className="o"
            {...bounce}
          >
            O
          </motion.div>

          {/* Sixth letter (M) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 2.6 }} // 2.6 sec delay for sixth letter
            className="m"
            {...bounce}
          >
            M
          </motion.div>

          {/* Seventh letter (E) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 2.9 }} // 2.9 sec delay for seventh letter
            className="e2"
            {...bounce}
          >
            E
          </motion.div>
        </div>
      </div>
     
    {/* <motion.div
      drag
      dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
      whileDrag={{ scale: 1.2, rotate: 10 }}
      transition={{ type: "spring", stiffness: 200 }}
      style={{
        width: "150px",
        height: "150px",
        backgroundColor: "#3b3b3b",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        cursor: "grab",
      }}
    >
      Drag Me
    </motion.div>
    <motion.input
      whileFocus={{ scale: 1.1, borderColor: "#ff4081", boxShadow: "0 0 10px #ff4081" }}
      transition={{ duration: 0.3 }}
      style={{
        padding: "10px",
        fontSize: "16px",
        border: "2px solid #3b3b3b",
        borderRadius: "8px",
        outline: "none",
      }}
      placeholder="Focus on Me"
    />
    <motion.div
      whileHover={{ scale: 1.2, rotate: 15, backgroundColor: "#ff4081" }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        width: "150px",
        height: "150px",
        backgroundColor: "#3b3b3b",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      Hover Me
    </motion.div> */}
    </div>
  );
};

export default Hero;
