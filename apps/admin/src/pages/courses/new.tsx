import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import Header from "~/components/ui/Header";
import Nav from "~/components/ui/Nav";
import SectionWrapper from "~/components/SectionWrapper";

const CreateCourseForm: React.FC = () => {
	const router = useRouter();
	const toast = useRef<Toast>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
	const [image, setImage] = useState("");

  const { mutate, error } = api.course.create.useMutation({
    onSuccess() {
      setName("");
      setDescription("");
			setImage("");
			toast.current?.show({severity:'success', summary: 'Success', detail:'Course created successfully', life: 6000});
			void router.push("/");
    },
		onError(error) {
			console.error(error);
			toast.current?.show({severity:'error', summary: 'Error', detail:'Something went wrong', life: 6000});
		},
  });

  return (
		<><Toast ref={toast} />
		<div className="card justify-content-center">
			<div className="field card flex">
				<span className="p-float-label">
					<InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
					<label htmlFor="name">Course name</label>
				</span>
			</div>
			{error?.data?.zodError?.fieldErrors.name && (
				<span className="mb-2 text-red-500">
					{error.data.zodError.fieldErrors.name}
				</span>
			)}
			<div className="field card flex">
				<span className="p-float-label">
					<InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />
					<label htmlFor="description">Description</label>
				</span>
			</div>
			{error?.data?.zodError?.fieldErrors.description && (
				<span className="mb-2 text-red-500">
					{error.data.zodError.fieldErrors.description}
				</span>
			)}
			<div className="field card flex">
				<span className="p-float-label">
					<InputText id="image" value={image} onChange={(e) => setImage(e.target.value)} />
					<label htmlFor="image">Image</label>
				</span>
			</div>
			{error?.data?.zodError?.fieldErrors.image && (
				<span className="mb-2 text-red-500">
					{error.data.zodError.fieldErrors.image}
				</span>
			)}
			<div className="field card flex">
				<Button
					onClick={() => {
						mutate({
							name,
							description,
							image,
						});
					} }
					label="Add new course" raised />
			</div>

		</div></>
  );
};

const NewCourse = () => {

	return (
		<><Header title="Create course - Admin" />
		<Nav />
		<SectionWrapper className="mt-0">
			<CreateCourseForm />
		</SectionWrapper>
		</>
	);
};

export default NewCourse;