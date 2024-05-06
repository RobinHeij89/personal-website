import React from 'react'
import { Logo } from '../logo'
import grid from '../grid/grid.module.css'
import style from './header.module.css';
import clsx from 'clsx';
import HeaderGfx from '../header-gfx/gfx';


export const Header = () => {
  return (
    <header className={clsx(grid.grid, style.header)}>
      <div className={style['scroll-watcher']} />
      <div className={clsx(grid.grid, style['top-line'])}>
        <div className={style.logo}>
          <Logo />
        </div>

        <h1 className={clsx(style.title, style.typography)}>
          <p>Robin Heij</p>
          <p>Freelance developer</p>
        </h1>

        <p className={clsx(style.location, style.typography)}>Based in Rotterdam, the Netherlands</p>
      </div>

      <div className={style['text-block']}>
        <div className={style.background}></div>
        <h2>
          <span>
            Conscious
          </span> Creative Developer
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis dapibus sapien. Duis ac erat ac ligula facilisis convallis ac et ante. Mauris nec leo nibh. Aliquam erat volutpat.
        </p>
      </div>

      {/* <HeaderGfx /> */}

      <div className={style.large}>
        Robinheij.dev
      </div>

      <div className={style.small}>
        Robinheij.dev
      </div>

      <div className={style['photo-container']}>
        <img src='./robin.jpg' alt="Robin Heij" className={style.photo} />
      </div>


    </header>
  )
}