import grid from '../grid/grid.module.css'
import style from './clients.module.css';
import clsx from 'clsx';

export const Clients = () => {
  return (
    <div className={clsx(grid.grid, style.wrapper)}>
      <div className={style["image-container"]}><img src="https://placekitten.com/200/300" alt="Photo" /></div>
      <div className={style["image-container"]}><img src="https://placekitten.com/200/300" alt="Photo" /></div>
      <div className={style["image-container"]}><img src="https://placekitten.com/200/300" alt="Photo" /></div>
      <div className={style["image-container"]}><img src="https://placekitten.com/200/300" alt="Photo" /></div>
      <div className={style["image-container"]}><img src="https://placekitten.com/200/300" alt="Photo" /></div>
      <div className={style["image-container"]}><img src="https://placekitten.com/200/300" alt="Photo" /></div>
    </div>
  )
}