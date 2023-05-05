/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { api } from '~/utils/api';
import toast from 'react-hot-toast';

const LessonEditor: React.FC<{
	id: number;
	html: string | undefined;
}> = ({ id, html }) => {
  const editorRef = useRef(null);

	const { mutate, error } = api.lesson.saveHTML.useMutation({
    onSuccess() {
			toast.success("Lesson updated successfully");
    },
		onError(error) {
			console.error(error);
      toast.error("Something went wrong");
		},
  });

  const save = () => {
    if (editorRef.current) {
			const html = editorRef.current.getContent();
			mutate({ id, html });
    }
  };

  return (
    <>
      <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={html}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'autoresize', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
					autoresize_overflow_padding: 0,
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={save} className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Save editor content</button>
    </>
  );
};

export default LessonEditor;