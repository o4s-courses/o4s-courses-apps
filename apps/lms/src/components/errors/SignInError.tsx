import { Alert } from '@chakra-ui/react'

type Props = {
	error: string
}

export const SignInError = ({ error }: Props) => {
	const errors: Record<string, string> = {
		Signin: 'Try signing with a different account.',
		OAuthSignin: 'Try signing with a different account.',
		OAuthCallback: 'Try signing with a different account.',
		OAuthCreateAccount: 'Email not found. Try signing with a different provider.',
		EmailCreateAccount: 'Try signing with a different account.',
		Callback: 'Try signing with a different account.',
		OAuthAccountNotLinked: 'To confirm your identity, sign in with the same account you used originally.',
		default: 'An error occurred. Please try again.',
	}
	return (
		<Alert status="error" variant="solid" rounded="md">
			{errors[error] ?? errors[error]}
		</Alert>
	)
}