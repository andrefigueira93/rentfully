import React from "react";

export interface PageTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
  description?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  description,
  ...rest
}) => {
  return (
    <div className="mx-auto max-w-3xl text-center mt-12 mb-4">
      <h2
        className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl"
        {...rest}
      >
        {title}
      </h2>
      <p className="mt-4 text-slate-500 dark:text-slate-100">{description}</p>
    </div>
  );
};

export default PageTitle;
