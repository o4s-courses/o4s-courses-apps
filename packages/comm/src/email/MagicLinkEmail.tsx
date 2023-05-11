import React, { type ComponentProps } from 'react'
import {
	Mjml,
	MjmlBody,
	MjmlSection,
	MjmlColumn,
	MjmlSpacer,
} from '@faire/mjml-react'
import { render } from '@faire/mjml-react/utils/render'
import { HeroImage, Text, Button, Head } from '../components'
import { type SendMailOptions } from 'nodemailer'
import { sendEmail } from './sendMail'

type Props = {
	url: string
}

export const MagicLinkEmail = ({ url }: Props) => (
	<Mjml>
		<Head />
		<MjmlBody width={600}>
			<MjmlSection padding="0">
				<MjmlColumn>
					<HeroImage src="https://dl-web.meocloud.pt/dlweb/TmN0YqR35ih__V3B8j--ag/download/o4s-courses/images/logoO4S-70alt.png" />
				</MjmlColumn>
			</MjmlSection>
			<MjmlSection padding="0 24px" cssClass="smooth">
				<MjmlColumn>
					<Text>Here is your magic link 👇</Text>
					<MjmlSpacer />
					<Button link={url} align="center">
						Click here to sign in
					</Button>
					<Text>
						If you didn&apos;t request this, please ignore this email.
					</Text>
					<Text>
						Best,
						<br />- O4S Team.
					</Text>
				</MjmlColumn>
			</MjmlSection>
		</MjmlBody>
	</Mjml>
)

export const sendMagicLinkEmail = ({
	to,
	...props
}: Pick<SendMailOptions, 'to'> & ComponentProps<typeof MagicLinkEmail>) =>
	sendEmail({
		to,
		subject: 'Sign in to O4S LMS',
		html: render(<MagicLinkEmail {...props} />).html,
	})
