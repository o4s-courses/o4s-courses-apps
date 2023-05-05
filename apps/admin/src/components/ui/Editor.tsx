/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor: React.FC<{
	html: string;
	onChange: any;
}> = ({ html, onChange }) => {

	return (
		<CKEditor
          editor={ ClassicEditor }
          data={html}
          onReady={ editor => {
            // You can store the "editor" and use when it is needed.
            console.log( 'Editor is ready to use!', editor );
          }}
          onChange={(event, editor) => {
						const data: string = editor.getData();
						(Math.abs(data.length - html.length) > 100) ?	onChange(data) : console.log(data);
					}}
          onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
          }}
          onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor );
          }}
        />
	);
};

export default Editor;