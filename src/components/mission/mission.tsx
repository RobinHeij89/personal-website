import React from 'react'
import { Logo } from '../logo'
import grid from '../grid/grid.module.css'
import style from './mission.module.css';
import clsx from 'clsx';

export const Mission = () => {
  return (
    <div className={clsx(grid.grid, style.wrapper)}>
      <div className={style.tag}>
        <h2>
          <span>
            Levering my skills
          </span>
          for positive change.
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis dapibus sapien. Duis ac erat ac ligula facilisis convallis ac et ante. Mauris nec leo nibh.
        </p>
      </div>
      <div className={style.gfx}>
        <img src='https://placekitten.com/200/300' alt="Photo" />
      </div>
      <div className={style.tail}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis dapibus sapien. Duis ac erat ac ligula facilisis convallis ac et ante. Mauris nec leo nibh. Aliquam erat volutpat. Fusce lorem lacus, lacinia pellentesque eleifend at, egestas et purus. Maecenas at facilisis diam, vitae hendrerit velit. Morbi risus felis, varius nec nisi id, mollis fringilla mauris. Nullam sit amet sem urna. Donec a aliquam eros. Duis sit amet massa id ligula ultricies mollis at nec sapien. Proin tincidunt finibus lectus sit amet consectetur. Etiam fringilla malesuada orci ac porta.
        </p>
      </div>
    </div>
  )
}