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

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status: ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;
    return {
      token,
      expire,
      signature,
    };
  } catch (error: any) {
    throw new Error(`Authentication request faild: ${error.message}`);
  }
};

export const ImageUploader = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const IKUploadRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: null,
  });

  const onError = (error: Error | { message: string; status?: number }) => {
    console.log(error);

    toast({
      title: "Image uploaded failed",
      description: `Your image could not be uploaded. Please try again`,
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

          if (IKUploadRef.current) {
            IKUploadRef.current.click();
          }
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

        {file && <p className='upload-filename'>{file.filePath}</p>}
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
