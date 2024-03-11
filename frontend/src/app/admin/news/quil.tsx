"use client";

import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


interface CKeditorProps {
    onChange: (data: string) => void;
    value: string;
}

export default function CKeditor({
    onChange,
    value,
}: CKeditorProps) {
    const editorRef = useRef<{ CKEditor: typeof CKEditor; ClassicEditor: typeof ClassicEditor }>();
    const [editorLoaded, setEditorLoaded] = useState<boolean>(false)

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
        };
        setEditorLoaded(true)
    }, []);

    return (
        <>
            {editorLoaded ? (
                <CKEditor
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event: any, editor: any) => {
                        const data = editor.getData();
                        onChange(data);
                    }}
                    config={{
                        toolbar: {
                            items: [
                                'undo', 'redo',
                                '|', 'heading',
                                '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                                '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                                '|', 'link', 'blockQuote', 'codeBlock',
                                '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
                            ],
                            shouldNotGroupWhenFull: false
                        }
                    }}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </>
    );
}