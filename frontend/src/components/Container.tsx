import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={`max-w-[90%] w-full m-auto ${className}`}>{children}</div>
  );
};

export default Container;
