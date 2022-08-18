import React from "react";
import styles from "./SideMenu.module.css";
import { sideMenuList } from "./mockup";
import { Menu } from "antd";
import { CarOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";


export const SideMenu: React.FC = () => {


  return (
    <Menu
      mode = 'vertical'
      className={styles["side-menu"]}
      items = {
        sideMenuList.map((m)=>(
          {
            label: m.title,
            key: nanoid(),
            icon: <CarOutlined/>,
            children: m.subMenu.map((mm)=>(
              {label: mm.title,
              key: nanoid(),
              icon: <CarOutlined/>,
              children: mm.subMenu.map((aa)=>(
                {label: aa,
                  key: nanoid(),
                  icon: <CarOutlined/>,
                }
              ))}
            ))
          }

        ))}/>)}




  // sideMenuList.map((m)=>(     
  //   console.log(m)))
  // test for the m loop 