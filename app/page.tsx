'use client'

import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import LogoutButton from '../components/LogoutButton'
import { Box, Flex, Text, Button, Link } from '@chakra-ui/react';

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createClientComponentClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <Box w="full" display="flex" flexDirection="column" alignItems="center">
      <Box w="full" display="flex" justifyContent="center" borderBottom="1px" borderBottomColor="foreground.10" h="16">
        <Box w="full" maxW="4xl" display="flex" justifyContent="between" alignItems="center" p="3" fontSize="sm" color="foreground">
          <Box />
          <Box>
            {user ? (
              <Flex alignItems="center" gap="4">
                Hey, {user.email}!
                <LogoutButton />
              </Flex>
            ) : (
              <Link
                href="/login"
                // p="2"
                px="4"
                borderRadius="md"
                textDecoration="none"
                bg="btn.background"
                _hover={{ bg: "btn.backgroundHover" }}
              >
                Login
              </Link>
            )}
          </Box>
        </Box>
      </Box>
      <Flex alignItems="center" justifyContent="center" h="screen">
        {user ? (
          <Flex flexDirection="column" alignItems="center" gap="4">
            <Text>Welcome to Gainz, {user.email}!</Text>
            <Button p="2" px="4" borderRadius="md" bg="btn.background" _hover={{ bg: "btn.backgroundHover" }}>
              Start Workout
            </Button>
          </Flex>
        ) : (
          <Flex flexDirection="column" alignItems="center" gap="4">
            <Text>Welcome to Gainz! Please log in to your account or sign up.</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}
