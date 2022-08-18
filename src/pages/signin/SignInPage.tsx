import React from 'react'
import { UserLayout } from '../../layouts/userLayout/UserLayout'
import {SignInForm} from './SignInForm'

export default function SignInPage() {
  return (
    <UserLayout>
      <SignInForm/>
    </UserLayout>
  )
}
