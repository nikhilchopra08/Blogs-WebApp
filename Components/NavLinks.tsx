import Link from "next/link";

type Props = {
    href: string;
    title: string;
    className?: string; // Optional className prop
};

const NavLinks = ({ href, title, className }: Props) => {
    return (
        <Link href={href} className={className}>
            <div className="block font-semibold py-2 pl-3 pr-4 text-white">
                {title}
            </div>
        </Link>
    );
};

export default NavLinks;