import clsx from "clsx";

interface TitleProps {
  level?: number;
  children: string;
  className?: string;
}

export const Title = ({ level, children, className }: TitleProps) => {
  // https://stackoverflow.com/a/59685929/8677167
  const HeadingTag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const cn = clsx(className, {
    "font-bold text-2xl": level == 1,
    "font-bold text-lg": level == 2,
    "font-bold dark:text-gray-200": level == 3,
  });
  return <HeadingTag className={cn}>{children}</HeadingTag>;
};
