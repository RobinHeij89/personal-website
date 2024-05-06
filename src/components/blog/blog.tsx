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

  type BlogItem = {
    id: string;
    title: string;
    category: Category;
  }

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

  const Card = ({ item }: { item: BlogItem }) => {
    return (
      <div className={clsx(style['reworked-thumbnail'], returnClass(item.category))}>
        <div className={style['reworked-layout']}>
          <div className={style['reworked-gfx-container']}>
            <div className={style['reworked-caption-layout']}>
              <p className={style.caption}>
                <span>{item.category}</span>
                <div className={clsx(style['aligner'], style['caption-aligner'], style['top-aligner'])} />
                <div className={clsx(style['aligner'], style['caption-aligner'], style['bottom-aligner'])} />
              </p>
            </div>
            <div className={style['reworked-gfx']} />
          </div>
        </div>
        <div className={style["title-container"]}>
          <div className={clsx(style['aligner'], style['title-aligner'], style['top-aligner'])} />
          <div className={clsx(style['aligner'], style['title-aligner'], style['bottom-aligner'])} />
          <h3 className={style.title}>
            {item.title}
          </h3>
        </div>
      </div>
    )
  }

  return (
    <div className={style.wrapper}>
      <div className={grid.grid}>
        <h2>The <span>Blog</span></h2>
      </div>
      <ul className={grid.grid}>
        {data.map((item) => (
          <li key={item.id}>
            <Card item={item} />
          </li>
        ))}
      </ul>
      <div className={grid.grid}>
        <div className={style['button-container']}>
          <button>More</button>
        </div>
      </div>
    </div>
  )
}