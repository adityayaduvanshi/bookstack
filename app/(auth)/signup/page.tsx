import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

import { DEFAULT_SIGNIN_REDIRECT } from '@/config/defaults';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OAuthButtons } from '@/components/auth/oauth-buttons';

import { Icons } from '@/components/icons';
import { SignUpForm } from '@/components/auth/signup-form';

// LATER
// export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
//   title: 'Sign Up',
//   description: 'Sign up for an account',
// };

export default async function SignUpPage(): Promise<JSX.Element> {
  const session = await auth();
  if (session) redirect(DEFAULT_SIGNIN_REDIRECT);

  return (
    <div>
      <SignUpForm />
    </div>
    // <div className="flex h-auto min-h-screen w-full items-center justify-center md:flex">
    //   <Card className="max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
    //     <CardHeader className="space-y-1">
    //       <div className="flex items-center justify-between">
    //         <CardTitle className="text-2xl">Sign In</CardTitle>
    //         <Link href="/">
    //           <Icons.close className="size-4" />
    //         </Link>
    //       </div>
    //       <CardDescription>
    //         Choose your preferred sign up method
    //       </CardDescription>
    //     </CardHeader>
    //     <CardContent className="max-sm:w-full max-sm:max-w-[340px] max-sm:px-10">
    //       <OAuthButtons />
    //     </CardContent>
    //   </Card>
    // </div>
  );
}
