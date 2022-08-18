import React from 'react'
import { UserLayout } from '../../layouts/userLayout/UserLayout'
import { RegisterForm } from './RegisterForm'
import { Typography } from 'antd'
import styles from "./RegisterForm.module.css";


export default function RegisterPage() {


  return (
    <UserLayout>
      <Typography.Title className={styles.title}>Register</Typography.Title>
      <RegisterForm/>
    </UserLayout>
  )
}
