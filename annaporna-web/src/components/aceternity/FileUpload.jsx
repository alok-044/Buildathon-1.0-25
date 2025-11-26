import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

export const FileUpload = ({ onChange }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (newFiles) => {
    if (newFiles.length > 0) {
      setFile(newFiles[0]);
      onChange(newFiles[0]);
    }
  };

  const onDrop = (acceptedFiles) => {
    handleFileChange(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden border border-dashed border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black"
      >
        <input {...getInputProps()} className="hidden" />
        <div className="absolute inset-0 mask-[linear-gradient(to_bottom,white,transparent)]">
          <div className="h-full w-full border-neutral-200 dark:border-neutral-800 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="flex flex-col items-center justify-center">
          {file ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 w-full max-w-xs mx-auto"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <Upload size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">{file.name}</p>
                  <p className="text-xs text-neutral-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setFile(null); onChange(null); }}
                  className="p-1 hover:bg-red-50 text-neutral-400 hover:text-red-500 rounded-full transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="mt-3 rounded-lg overflow-hidden h-32 w-full relative">
                 <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          ) : (
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                layoutId="file-upload"
                variants={{
                  initial: { scale: 1 },
                  animate: { scale: 1.1 },
                }}
                className="h-14 w-14 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 group-hover/file:shadow-2xl transition-all duration-300"
              >
                <Upload className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
              </motion.div>
              <p className="text-neutral-700 dark:text-neutral-300 font-bold text-lg mt-2">
                Upload Food Image
              </p>
              <p className="text-neutral-400 dark:text-neutral-400 text-sm mt-1 text-center max-w-xs">
                Drag and drop your image here or click to browse.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};