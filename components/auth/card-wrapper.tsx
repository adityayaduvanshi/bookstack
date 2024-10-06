'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '../ui/card';
import Header from './header';
import { OAuthButtons } from './oauth-buttons';
import { Separator } from '../ui/separator';
interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className=" w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        <OAuthButtons />
        <Separator className=" my-4" />
        {children}
      </CardContent>
      {/* <CardFooter>
       
      </CardFooter> */}
      <CardFooter>
        <Button
          variant="link"
          className=" font-normal w-full  "
          size="sm"
          asChild
        >
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
