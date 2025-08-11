import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

interface Props {
  name: string;
  value: File | null;
  onChange: (name: string, value: File | undefined) => void;
}

const FileInputWithPreview = ({ name, value, onChange }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // const inputRef:any = useRef();

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile: File | undefined = event.target.files?.[0];
    // onChange(name, selectedFile);
    if (selectedFile) {
      setSelectedFile(selectedFile);
      console.log("file=", selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleRemovePreview = () => {
    console.log("remove=");
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div>
      <input
        type="file"
        // ref={inputRef}
        onChange={handleFileInputChange}
        accept="image/png, image/jpeg"
      />
      {previewUrl && (
        <div>
          <Image
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
          <button onClick={handleRemovePreview}>Remove Preview</button>
        </div>
      )}
    </div>
  );
};
export default FileInputWithPreview;
