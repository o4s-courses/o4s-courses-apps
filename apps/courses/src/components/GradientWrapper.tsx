type Props = {
	children: React.ReactNode;
  className: string;
};

const GradientWrapper = ({ children, className }: Props ) => (
    <div
        className={`bg-gray-900 relative py-28 sm:py-32 ${className || ""}`}>
        <div className="blur-[138px] absolute inset-0 m-auto max-w-7xl h-[230px]"
            style={{
                background:
                    "linear-gradient(106.89deg, rgba(2,0,36,1) 0%, rgba(6,108,43,1) 100%, rgba(0,212,255,1) 100%)",
            }}>

        </div>
        <div className="relative">
            {children}
        </div>
    </div>
);

export default GradientWrapper;