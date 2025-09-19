const particlePositions = [
  { top: "20%", left: "30%" },
  { top: "35%", left: "50%" },
  { top: "8%", left: "90%" },
  { top: "30%", right: "5%" },
  { top: "50%", left: "10%" },
  { top: "60%", left: "40%" },
  { top: "25%", left: "40%" },
  { top: "10%", left: "4%" },
  { top: "70%", left: "65%" },
  { top: "50%", left: "10%" },
  { bottom: "30%", left: "10%" },
];

const Particles: React.FC = () => {
  return (
    <>
      {particlePositions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-40 animate-pulse"
          style={{
            ...pos,
            filter: "blur(4px)",
            boxShadow: "0 0 16px rgba(59, 130, 246, 0.3)",
          }}
        />
      ))}
    </>
  );
};

export default Particles;
