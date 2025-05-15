"use client";

import { toast } from "@/hooks";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async (): Promise<IAuthResponse> => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status: ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    return {
      token: data.token,
      expire: data.expire,
      signature: data.signature,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
    throw new Error(`Unknown error during authentication`);
  }
};

interface Props {
  type: "IMAGE" | "VIDEO";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  value?: string;
  onFileChange: (filePath: string) => void;
}

export const FileUploader = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  value,
  onFileChange,
}: Props) => {
  const IKUploadRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });

  const [progress, setProgress] = useState<number>(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onError = (error: Error | { message: string; status?: number }) => {
    console.error("Upload error:", error);

    toast({
      title: `${type} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again.`,
    });
  };

  const onSuccess = (res: { filePath: string }) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `${type} uploaded successfully`,
      description: `${res.filePath} uploaded successfully`,
    });
  };

  const onValidate = (file: File) => {
    if (type === "IMAGE") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 20MB in size",
          variant: "destructive",
        });

        return false;
      }
    } else if (type === "VIDEO") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 50MB in size",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={IKUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percentage = Math.round((loaded / total) * 100);

          setProgress(percentage);
        }}
        folder={folder}
        accept={accept}
        className='hidden'
      />

      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          IKUploadRef.current?.click();
        }}
      >
        <Image
          src='/icons/upload.svg'
          alt='upload-icon'
          width={20}
          height={20}
          className='object-contain'
        />
        <p className={cn("text-base text-light-100", styles.placeholder)}>
          {placeholder}
        </p>

        {file.filePath && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>

      {progress > 0 && (
        <div className='w-full rounded-full bg-green-200'>
          <div className='progress' style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file.filePath &&
        (type === "IMAGE" ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) : type === "VIDEO" ? (
          <IKVideo
            path={file.filePath}
            controls
            className='h-96 w-full rounded-xl'
          />
        ) : null)}
    </ImageKitProvider>
  );
};
