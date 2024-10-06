'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';

import { DEFAULT_SIGNIN_REDIRECT } from '@/config/defaults';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
export function OAuthButtons(): JSX.Element {
  const { toast } = useToast();

  async function handleOAuthSignIn(
    provider: 'google' | 'github'
  ): Promise<void> {
    try {
      await signIn(provider, {
        callbackUrl: DEFAULT_SIGNIN_REDIRECT,
      });

      toast({
        title: 'Success!',
        description: 'You are now signed in',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        variant: 'destructive',
      });

      console.error(error);
      throw new Error(`Error signing in with ${provider}`);
    }
  }

  return (
    <div className="w-full flex  items-center gap-2  sm:gap-4">
      <Button
        aria-label="Sign in with Google"
        variant="outline"
        size="lg"
        onClick={() => void handleOAuthSignIn('google')}
        className="w-full lg:w-full"
      >
        {/* <Icons.google className="mr-2 size-4  text-green-600" /> */}
        <FcGoogle className=" h-5 w-5 mr-2" />
        Google
      </Button>

      <Button
        aria-label="Sign in with gitHub"
        variant="outline"
        size="lg"
        onClick={() => void handleOAuthSignIn('github')}
        className="lg:w-full sm:w-auto"
      >
        <FaGithub />
        GitHub
      </Button>
    </div>
  );
}
