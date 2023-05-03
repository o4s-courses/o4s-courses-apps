import Link from "next/link";

type Props = {
	children: React.ReactNode;
	href: string;
	className: string;
};

const NavLink = ({ children, href, className }: Props) => (
    <Link href={href} className={`py-2.5 px-4 text-center rounded-lg duration-150 ${className || ""}`}>
        {children}
    </Link>
);

export default NavLink;