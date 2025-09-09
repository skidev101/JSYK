import type { ReactNode } from "react";

interface CardProps {
   children: ReactNode;
   className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-gray-100 rounded-xl p-4 shadow ${className}`}>
      {children}
    </div>
  );
};

export default Card