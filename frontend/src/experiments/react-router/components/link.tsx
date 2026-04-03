import { useRouter } from "../lib";

export interface LinkProps {
  to: string;
}

export const Link = ({ children, to }: React.PropsWithChildren<LinkProps>) => {
  const router = useRouter();

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    router.navigate(to);
  };

  const isActive = router.pathname === to;

  return (
    <a href={to} onClick={onClick} style={{ color: isActive ? "red" : "" }}>
      {children}
    </a>
  );
};
