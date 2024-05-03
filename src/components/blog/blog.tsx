import React from 'react'
import grid from '../grid/grid.module.css'
import style from './blog.module.css';
import clsx from 'clsx';

enum Category {
  CSS = 'CSS',
  JAVASCRIPT = 'JAVASCRIPT',
  REACT = 'REACT',
  TYPESCRIPT = 'TYPESCRIPT'
}

export const Blog = () => {

  const data = [
    {
      id: '1',
      title: 'Mixins coming to ',
      category: Category.CSS
    },
    {
      id: '2',
      title: 'Mixins coming to CSS in Chrome  experimental',
      category: Category.JAVASCRIPT
    },
    {
      id: '3',
      title: 'Mixins coming to CSS in Chrome  experimental',
      category: Category.JAVASCRIPT
    }
  ];

  const returnClass = (category: Category) => {
    switch (category) {
      case Category.CSS:
        return style.css;
      case Category.JAVASCRIPT:
        return style.javascript;
      case Category.REACT:
        return style.react;
      case Category.TYPESCRIPT:
        return style.typescript;
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={grid.grid}>
        <h2>The <span>Blog</span></h2>
      </div>
      <ul className={grid.grid}>
        {data.map((item) => (
          <li key={item.id}>
            <div className={clsx(style.thumbnail, returnClass(item.category))}>
              <div className={style['caption-layout']}>
                <p className={style.caption}><span>{item.category}</span></p> <span className={style.filler} />
              </div>
              <div className={style.layout}>
                <div className={style.gfx} />
                <div className={style["title-container"]}>
                  <h3 className={style.title}>
                    <span>
                      {item.title}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={grid.grid}>
        <button>More</button>
      </div>
    </div>
  )
}