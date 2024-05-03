import React from 'react'
import grid from '../grid/grid.module.css'
import style from './blog.module.css';
import clsx from 'clsx';

export const Blog = () => {
  return (
    <div className={clsx(grid.grid, style.wrapper)}>
      <h2>The Blog</h2>
      <ul>
        <li>
          <div>
            <p>Caption</p>
            <h3>Title</h3>
          </div>
        </li>
        <li>
          <div>
            <p>Caption</p>
            <h3>Title</h3>
          </div>
        </li>
        <li>
          <div>
            <p>Caption</p>
            <h3>Title</h3>
          </div>
        </li>
      </ul>
      <button>More</button>
    </div>
  )
}