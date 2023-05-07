import { useRouter } from "next/router";
import { Button } from "primereact/button";

const PageNotFound = () => {
	const router = useRouter();
	
	return (
		<div className="surface-0 text-700 text-center">
				<div className="text-blue-600 text-3xl font-bold mb-3">404 Error</div>
				<div className="text-900 font-bold text-5xl mb-3">Page not found</div>
				<div className="text-700 text-2xl mb-5">Sorry, the page you are looking for could not be found or has been removed.</div>
				<Button onClick={() => { void router.push('/'); }} label="Go home" icon="pi pi-home" className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap" />
		</div>
	);
};

export default PageNotFound;