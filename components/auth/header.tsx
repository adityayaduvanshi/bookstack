import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
const font = Poppins({ subsets: ['latin'], weight: ['600'] });

interface HeaderInterface {
  label: string;
}
const Header = ({ label }: HeaderInterface) => {
  return (
    <div className=" w-full flex flex-col items-center gap-y-4 justify-center">
      <h1 className={cn(' text-3xl  font-semibold', font.className)}>
        Rainbox
      </h1>
      <p className=" text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default Header;
