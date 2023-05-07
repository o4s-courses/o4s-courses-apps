/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { type RouterOutputs, api } from '~/utils/api';
import { Toast } from 'primereact/toast';

import SectionWrapper from "~/components/SectionWrapper";
import LessonHeader from "~/components/ui/LessonHeader";

const LessonEditor: React.FC<{
	lesson: RouterOutputs["lesson"]["getContent"];
}> = ({ lesson }) => {
  const editorRef = useRef(null);
	const toast = useRef<Toast>(null);
	const id = lesson?.id;
	const initialHTML = lesson?.html;

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
		<LessonHeader lesson={lesson} saveLessonHTML={() => save()} />
		<SectionWrapper className="mt-0">
      <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={initialHTML}
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
		</SectionWrapper>
    </>
  );
};

export default LessonEditor;