import { TextLink } from '~/components/TextLink'
import { VStack, Heading, Text } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation';
import { SignInForm } from '~/components/forms/SignInForm'

type Props = {
	type: 'signin' | 'signup'
	defaultEmail?: string
}

export const SignIn = ({ type, defaultEmail }: Props) => {
	const queryParams = useSearchParams()
	const query = queryParams.get('g')

	return (
		<VStack spacing={4} h="100vh" justifyContent="center">
			<Heading>
				{type === 'signin'
					? 'Sign In'
					: 'Create an account'
				}
			</Heading>
			{type === 'signin' ? (
				<Text>
					'Don't have an account? '
					<TextLink href="/auth/register">
						'Sign up for free'
					</TextLink>
				</Text>
			) : (
				<Text>
					'Already have an account? '
					<TextLink href="/auth/signin">
						'Sign in'
					</TextLink>
				</Text>
			)}
			<SignInForm defaultEmail={query?.toString()} />
		</VStack>
	)
}
