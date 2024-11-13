import { Logo } from '../logo'
import grid from '../grid/grid.module.css'
import style from './header.module.css';
import clsx from 'clsx';


export const Header = () => {
  return (
    <header className={style.header}>
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
      <div className={style.divider} />
    </header>
  )
}