import React from 'react'
import styles from './MainLayout.module.css'
import {Header} from '../../components/header/Header'
import {Footer} from '../../components/footer/Footer'


type myProps = {
    children ?:React.ReactNode;
}
// 回头看看： 什么事React.ReactNode and ？：

// 实际上，这里把header和footer封装起来，以后拿到其他的组件用


export const MainLayout: React.FC<myProps> = ({children}) => { 
    //remember to define the type of the props
    return(
    <>
        <Header/>
            <div className={styles['page-content']}>
                {/* this area is for the main content */}
                {children}
            </div>

        <Footer/>
    </>
    )
}
