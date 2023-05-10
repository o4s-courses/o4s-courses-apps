import React from 'react'
import { type IMjmlButtonProps, MjmlButton } from '@faire/mjml-react'
import { blue, grayLight } from '../themes/email'
import { leadingTight, textBase, borderBase } from '../themes/email'

type ButtonProps = {
  link: string
  children: React.ReactNode
} & IMjmlButtonProps

export const Button = ({ link, children, ...props }: ButtonProps) => (
  <MjmlButton
    lineHeight={leadingTight}
    fontSize={textBase}
    fontWeight="700"
    height={32}
    padding="0"
    align="left"
    href={link}
    backgroundColor={blue}
    color={grayLight}
    borderRadius={borderBase}
    {...props}
  >
    {children}
  </MjmlButton>
)
