import React from "react";

export interface SectionTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, ...rest }) => {
  return (
    <h3
      className="border-b text-xl text-slate-900 dark:text-slate-50"
      {...rest}
    >
      {children}
    </h3>
  );
};

export default SectionTitle;
