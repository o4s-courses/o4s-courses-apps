'use client'

import {
	Button,
	HTMLChakraProps,
	Input,
	Stack,
	HStack,
	Text,
	Spinner,
	Alert,
	Flex,
	AlertIcon,
	SlideFade,
} from '@chakra-ui/react'
import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import { useState } from 'react'
import {
	ClientSafeProvider,
	getProviders,
	LiteralUnion,
	signIn,
	useSession,
} from 'next-auth/react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { BuiltInProviderType } from 'next-auth/providers'
import { useToast } from '~/components/hooks/useToast'
import { TextLink } from '~/components/TextLink'
import { SignInError } from '~/components/errors/SignInError'

type Props = {
	defaultEmail?: string
}
export const SignInForm = ({
	defaultEmail,
}: Props & HTMLChakraProps<'form'>) => {
	const router = useRouter()
	const queryParams = useSearchParams()
	const callbackUrl = queryParams.get('callbackUrl')
	const { status } = useSession()
	const [authLoading, setAuthLoading] = useState(false)
	const [isLoadingProviders, setIsLoadingProviders] = useState(true)

	const [emailValue, setEmailValue] = useState(defaultEmail ?? '')
	const [isMagicLinkSent, setIsMagicLinkSent] = useState(false)

	const { showToast } = useToast()
	const [providers, setProviders] =
		useState<
			Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
		>()

	const hasNoAuthProvider =
		!isLoadingProviders && Object.keys(providers ?? {}).length === 0

	useEffect(() => {
		if (status === 'authenticated') {
			router.replace(callbackUrl?.toString() ?? '/dashboard/courses')
			return
		}
		; (async () => {
			const providers = await getProviders()
			setProviders(providers ?? undefined)
			setIsLoadingProviders(false)
		})()
	}, [status, callbackUrl, router])

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
		setEmailValue(e.target.value)

	const handleEmailSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (isMagicLinkSent) return
		setAuthLoading(true)
		const response = await signIn('email', {
			email: emailValue,
			redirect: false,
			callbackUrl: 'http://joseantcordeiro.hopto.org:3000',
		})
		if (response?.error) {
			showToast({
				title: 'Unauthorized',
				description: 'Sign ups are disabled.',
			})
		} else {
			setIsMagicLinkSent(true)
		}
		setAuthLoading(false)
	}

	if (isLoadingProviders) return <Spinner />

	if (hasNoAuthProvider)
		return (
			<Text>
				'You need to '
				<TextLink
					href="https://docs.typebot.io/self-hosting/configuration"
					isExternal
				>
					configure at least one auth provider (Email, Google, GitHub, Facebook or Azure AD).
				</TextLink>
			</Text>
		)

	return (
		<Stack spacing="4" w="330px">
			{!isMagicLinkSent && (
				<>
					{providers?.email && (
						<>
							<HStack as="form" onSubmit={handleEmailSubmit}>
								<Input
									name="email"
									type="email"
									autoComplete="email"
									placeholder="email@company.com"
									required
									value={emailValue}
									onChange={handleEmailChange}
								/>
								<Button
									type="submit"
									isLoading={
										['loading', 'authenticated'].includes(status) || authLoading
									}
									isDisabled={isMagicLinkSent}
								>
									Submit
								</Button>
							</HStack>
						</>
					)}
				</>
			)}

			<SlideFade offsetY="20px" in={isMagicLinkSent} unmountOnExit>
				<Flex>
					<Alert status="success" w="100%">
						<HStack>
							<AlertIcon />
							<Stack spacing={1}>
								<Text fontWeight="semibold">A magic link email was sent. 🪄</Text>
								<Text fontSize="sm">Make sure to check your spam folder.</Text>
							</Stack>
						</HStack>
					</Alert>
				</Flex>
			</SlideFade>
		</Stack>
	)
}