import React, { useRef } from 'react'
import style from './index.module.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Loading = () => {
  const ref = useRef(null)
  useGSAP(() => {
    const timeline = gsap.timeline({
      defaults: { ease: 'power2.in' },
      onStart() {
        document.documentElement.style.overflow = 'hidden'
      },
      onComplete() {
        document.documentElement.style.overflow = ''
      }
    })
    timeline.to('span', {
      direction: 1,
      delay: 1,
      yPercent: -200,
      opacity: 0,
      stagger: 0.1,
    }, 1).to(ref.current, {
      yPercent: -100,
      direction: 0.2,

    })
  }, { scope: ref})
  return (
    <div className={style.mark} ref={ref}>
      <p className={style.heading}>
        <span>Loading1</span> <span>Loading2</span>
        <br />
        <span>Loading3</span>
      </p>
    </div>
  )
}

export default Loading