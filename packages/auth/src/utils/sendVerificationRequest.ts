/* eslint-disable @typescript-eslint/no-unsafe-call */
import { sendMagicLinkEmail } from "@o4s/comm";

type Props = {
  identifier: string
  url: string
}

export const sendVerificationRequest = async ({ identifier, url }: Props) => {
  try {
    await sendMagicLinkEmail({ url, to: identifier })
  } catch (err) {
    throw new Error(`Email(s) could not be sent`)
  }
}
