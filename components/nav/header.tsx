import Link from 'next/link';
import { auth } from '@/lib/auth';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignOutButton } from '@/components/auth/signout-button';
import { Icons } from '@/components/icons';
import { Navigation } from '@/components/nav/navigation';
import { NavigationMobile } from '@/components/nav/navigation-mobile';
// import { ThemeToggle } from '@/components/theme-toggle';

export async function Header(): Promise<JSX.Element> {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full bg-transparent">
      <div className="container flex items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-lg font-bold tracking-wide transition-all duration-300 ease-in-out"
        >
          <Icons.rocket className="size-6 md:hidden lg:flex" />
          <span className="hidden md:flex">Rainbox</span>
        </Link>
        <Navigation navItems={siteConfig.navItems} />
        <div className="flex items-center justify-center">
          {/* <ThemeToggle /> */}
          <NavigationMobile navItems={siteConfig.navItems} />

          <nav className="space-x-1">
            {session?.user ? (
              <div>
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>

                {/* <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className={cn(
                      'transition-all duration-300 ease-in-out hover:opacity-70 '
                    )}
                  >
                    {session.user.image && (
                      <div>
                        <Avatar>
                          <AvatarImage src={session.user.image} />
                          <AvatarFallback>
                            {session.user.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session?.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild disabled>
                        <Link href="/dashboard/account">
                          <Icons.avatar
                            className="mr-2 size-4"
                            aria-hidden="true"
                          />
                          Account
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild disabled>
                        <Link href="/dashboard/settings">
                          <Icons.settings
                            className="mr-2 size-4"
                            aria-hidden="true"
                          />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <SignOutButton />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
              </div>
            ) : (
              <Link
                aria-label="Get started"
                href="/signup"
                className={cn(buttonVariants({ size: 'sm' }), 'ml-2')}
              >
                Get Started
                <span className="sr-only">Get Started</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
