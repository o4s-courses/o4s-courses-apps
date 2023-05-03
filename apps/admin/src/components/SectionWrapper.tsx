type Props = {
	children: React.ReactNode;
  className: string;
};

const SectionWrapper = ({ children, className }: Props) => (
    <section className={`py-6 sm:py-18 ${className || ""}`}>
        {children}
    </section>
);

export default SectionWrapper;