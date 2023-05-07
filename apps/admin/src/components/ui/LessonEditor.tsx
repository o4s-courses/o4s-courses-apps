/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { api } from '~/utils/api';
import { Toast } from 'primereact/toast';

const LessonEditor: React.FC<{
	id: number;
	html: string | undefined;
}> = ({ id, html }) => {
  const editorRef = useRef(null);
	const toast = useRef<Toast>(null);

	const { mutate, error } = api.lesson.saveHTML.useMutation({
    onSuccess() {
			toast.current?.show({severity:'success', summary: 'Success', detail:'Lesson updated successfully', life: 3000});
    },
		onError(error) {
			console.error(error);
			toast.current?.show({severity:'error', summary: 'Error', detail:'Something went wrong', life: 3000});
		},
  });

  const save = () => {
    if (editorRef.current) {
			const html = editorRef.current.getContent();
			mutate({ id, html });
    }
  };

  return (
    <><Toast ref={toast} />
      <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={html}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'emoticons', 'autoresize', 'lists', 'link', 'image', 'charmap',
            'anchor', 'nonbreaking', 'searchreplace', 'visualblocks', 'visualchars', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
					autoresize_overflow_padding: 0,
					image_caption: true,
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
						'link | image media | nonbreaking | ' +
            'removeformat | fullscreen preview | help',
          content_style: 'body { font-size:14px }'
        }}
      />
			<div className="mt-5 flex lg:ml-4 lg:mt-0">
      	<button onClick={save} className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Save editor content</button>
			</div>
    </>
  );
};

export default LessonEditor;