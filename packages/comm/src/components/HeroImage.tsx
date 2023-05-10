import { type IMjmlImageProps, MjmlImage } from '@faire/mjml-react'
import { borderBase } from '../themes/email'

export const HeroImage = (props: IMjmlImageProps) => (
  <MjmlImage
    cssClass="hero"
    padding="0"
    align="left"
    borderRadius={borderBase}
    {...props}
  />
)
