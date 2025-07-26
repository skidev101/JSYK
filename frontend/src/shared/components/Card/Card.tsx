import type { ReactNode } from "react";

interface CardProps {
   children: ReactNode;
   className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card