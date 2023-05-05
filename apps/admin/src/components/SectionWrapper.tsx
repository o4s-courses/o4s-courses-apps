type Props = {
	children: React.ReactNode;
  className: string;
};

const SectionWrapper = ({ children, className }: Props) => (
    <section className={`dark:bg-gray-900 py-6 sm:py-18 ${className || ""}`}>
        {children}
    </section>
);

export default SectionWrapper;