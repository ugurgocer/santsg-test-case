import React from "react";

type CardProps = {
  header: string;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({ header, footer, children, extra, className }) => {
  return (
    <div className={`flex flex-col border rounded shadow-sm border-gray-100 bg-white ${className || ""}`}>
        <div className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-200 h-14 shadow-sm">
            <h2 className="font-semibold text-xl text-blue-600">{header}</h2>
            {extra ? <div>{extra}</div> : <></>}
        </div>
        <div className="px-4 py-2 flex-1 overflow-auto">
            {children}
        </div>
        {footer ? <div className="flex items-center justify-between bg-gray-100 px-4 py-2 border-t border-gray-100 h-10">{footer}</div>:<></>}
    </div>
  );
}

export default Card;