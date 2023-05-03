type Props = {
	children: React.ReactNode;
  className: string;
};

const SectionWrapper = ({ children, className }: Props) => (
    <section className={`py-16 sm:py-28 ${className || ""}`}>
        {children}
    </section>
);

export default SectionWrapper;