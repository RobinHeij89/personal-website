/// <reference types="vite-plugin-svgr/client" />
import grid from '../grid/grid.module.css'
import style from './clients.module.css';
import clsx from 'clsx';
import Fag from './logos/fag.svg?react';
import Heineken from './logos/heineken.svg?react';
import IFFR from './logos/iffr.svg?react';
import Aviko from './logos/aviko.svg?react';
import Davidoff from './logos/davidoff.svg?react';
import Zwijsen from './logos/davidoff.svg?react';

export const Clients = () => {
  const logos = [
    {
      id: '1',
      svg: (<Fag />),
      title: 'Free A Girl Foundation',
      product: 'campaign website'
    },
    {
      id: '2',
      svg: (<Davidoff />),
      title: 'Zino Davidoff',
      product: 'e-commerce website'
    },
    {
      id: '3',
      svg: (<Heineken />),
      title: 'Heineken',
      product: 'socket connection to training app'
    },
    {
      id: '4',
      svg: (<IFFR />),
      title: 'International Film Festival Rotterdam',
      product: 'website'
    },
    {
      id: '5',
      svg: (<Aviko />),
      title: 'Aviko Foodservice',
      product: 'B2B website'
    },
    {
      id: '6',
      svg: (<Zwijsen />),
      title: 'Zwijsen Publisher',
      product: 'developer in their developer teams'
    }
  ]


  return (
    <div className={clsx(grid.grid, style.wrapper)}>
      {
        logos.map(logo => {
          return (
            <div key={logo.id} className={style["image-container"]}>{logo.svg}</div>
          )
        })
      }
    </div>
  )
}