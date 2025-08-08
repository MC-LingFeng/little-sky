import React from 'react'
import styles from './index.module.css'
import Logo from '../Logo'
import Button from '../Button'
const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.menu}>
        <Button btnProps={{ onClick: () => {
          console.log('123');
        } }}>123</Button>
      </div>
    </div>
  )
}

export default Header