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
        <div className={style.divider} />
      </div>

      <div className={clsx(grid.grid, style['headshot-wrapper'])}>
        <div className={style.headshot}>
          <div className={style['image-wrapper']}>
            <img src="/robin.jpg" alt="Robin Heij" />
          </div>
        </div>
      </div>

      <div className={clsx(grid.grid, style['introduction-wrapper'])}>
        <div className={style.introduction}>
          <p>Hello, my name is Robin, and I love</p>
          <h2>Building digital products, brands and experiences</h2>
        </div>
      </div>
    </header>
  )
}