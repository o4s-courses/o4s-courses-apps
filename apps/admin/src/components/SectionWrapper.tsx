type Props = {
	children: React.ReactNode;
  className: string;
};

const SectionWrapper = ({ children, className }: Props) => (
    <section className={`py-2 ${className || ""}`}>
        {children}
    </section>
);

export default SectionWrapper;