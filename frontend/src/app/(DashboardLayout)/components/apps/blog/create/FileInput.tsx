"use client";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import "./FileInput.css";
import Image from "next/image";

interface FileInputProps {
  className?: string;
  name: string;
  value: File | null;
  initialPreview: string;
  onChange: (name: string, value: File | null) => void;
}

function FileInput({
  className = "",
  name,
  value,
  initialPreview,
  onChange,
}: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(initialPreview);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files?.[0] || null;
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    console.log("value===", value)
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);

  return (
    <div className={`FileInput ${className}`}>
      <Image
        priority
        src={preview || "/images/blog/preview-placeholder.png"}
        alt="이미지 미리보기"
        width={100}
        height={100}
        className={`FileInput-preview ${preview ? "selected" : ""}`}
      />

      <input
        className="FileInput-hidden-overlay"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          <Image
            src={"/images/blog/ic-reset.png"}
            alt="선택해제"
            width={15}
            height={15}
          />
        </button>
      )}
    </div>
  );
}

export default FileInput;
