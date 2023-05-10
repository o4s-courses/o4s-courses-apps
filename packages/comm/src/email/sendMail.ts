import { createTransport, type SendMailOptions } from 'nodemailer'

export const sendEmail = (
  props: Pick<SendMailOptions, 'to' | 'html' | 'subject'>
) => {
  const transporter = createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  })

  return transporter.sendMail({
    from: process.env.EMAIL_FROM ?? 'noreply@o4s-lms.com',
    ...props,
  })
}