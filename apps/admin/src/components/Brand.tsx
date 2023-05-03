import Image from "next/image";

type Props = {
	className: string;
};

const Brand = ({ className }: Props) => (
  <Image
    src="/logoO4S-01.png"
    width={130}
    height={40}
    alt="O4S - Open for Sustainability"
		className={className}
  />
);

export default Brand;