import React from 'react'
import { Logo } from '../logo'
import grid from '../grid/grid.module.css'
import style from './footer.module.css';
import clsx from 'clsx';

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style['image-container']}>
        <img src='https://placekitten.com/200/300' alt="Photo" />
      </div>
      <div className={clsx(grid.grid, style['bottom-line'])}>
        <p className={clsx(style.name, style.typography)}>Robin Heij</p>
        <p className={clsx(style.role, style.typography)}>Freelance developer</p>

        <p className={clsx(style.location, style.typography)}>Based in Rotterdam, the Netherlands</p>
        <p className={clsx(style.copyright, style.typography)}>Copyright</p>
      </div>
    </footer>
  )
}