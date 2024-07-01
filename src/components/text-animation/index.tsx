import React from 'react';
import style from './style.module.css';

export const TextAnimation = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={style.container}>
      <span>
        {children}
      </span>
    </div>
  )
}