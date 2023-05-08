import { useRef, useState } from "react";
import { api } from "~/utils/api";

import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const CreateModuleForm: React.FC<{ courseId: number; }> = ({ courseId }) => {
	const toast = useRef<Toast>(null);
  const utils = api.useContext();

  const [name, setName] = useState("");

  const { mutate, error } = api.module.create.useMutation({
    async onSuccess() {
      setName("");
			toast.current?.show({severity:'success', summary: 'Success', detail:'Module created successfully', life: 3000});
      await utils.course.byId.invalidate();
    },
		onError(error) {
			console.error(error);
      toast.current?.show({severity:'error', summary: 'Error', detail:'Something went wrong', life: 3000});
		},
  });

  return (
		<><Toast ref={toast} />
    <div className="flex items-center border-b border-teal-500 pb-2">
			<InputText
				type="text"
				placeholder="Module name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="w-full" />
      {error?.data?.zodError?.fieldErrors.name && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.name}
        </span>
      )}
			<Button
				onClick={() => {
          mutate({
						courseId,
            name,
          });
        }}
				label="Module"
        icon="pi pi-plus"
        className="p-button-success"
			/>
    </div>
		</>
  );
};

export default CreateModuleForm;