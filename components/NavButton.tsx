import { motion } from "framer-motion";

export function NavButton({link, label}: any) {
  return (
    <motion.a
      href={link}
      className="relative block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
      variants={{
        rest: {},
        hover: {},
      }}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {label}
      <motion.span
        className="absolute left-0 bottom-0 h-[2px] w-full bg-black pointer-events-none"
        variants={{
          rest: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ originX: 0 }}
      />
    </motion.a>
  );
}
