"use client";

import { toast } from "@/hooks";
import config from "@/lib/config";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
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

interface ImageUploaderProps {
  onFileChange: (filePath: string) => void;
}

export const ImageUploader = ({ onFileChange }: ImageUploaderProps) => {
  const IKUploadRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: null,
  });

  const onError = (error: Error | { message: string; status?: number }) => {
    console.error("Upload error:", error);

    toast({
      title: "Image upload failed",
      description: "Your image could not be uploaded. Please try again.",
    });
  };

  const onSuccess = (res: { filePath: string }) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={IKUploadRef}
        className='hidden'
        onError={onError}
        onSuccess={onSuccess}
        fileName='text-upload.png'
      />
      <button
        className='upload-btn'
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
        <p className='text-base text-light-100'>Upload a File</p>
        {file.filePath && <p className='upload-filename'>{file.filePath}</p>}
      </button>

      {file.filePath && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};
