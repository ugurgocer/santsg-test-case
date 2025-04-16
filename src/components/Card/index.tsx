import React from "react";

type CardProps = {
  header: string;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({ header, footer, children, extra }) => {
  return (
    <div className="card">
        <div>
            <h2>{header}</h2>
            {extra ? <div>{extra}</div> : <></>}
        </div>
        <div>
            {children}
        </div>
        {footer ? <div>{footer}</div>:<></>}
    </div>
  );
}

export default Card;