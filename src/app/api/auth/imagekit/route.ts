import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

// Inisialisasi ImageKit
const {
  env: {
    imagekit: { privateKey, publicKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

// Daftar domain yang diizinkan akses CORS
const WHITE_LIST_DOMAIN = [
  "https://www.code-by-anjas.space",
  "http://localhost:3000",
];

// Fungsi util untuk cek origin valid
const isAllowedOrigin = (origin: string | null) =>
  origin && WHITE_LIST_DOMAIN.includes(origin);

// Handler GET
export const GET = async (req: Request) => {
  const origin = req.headers.get("origin");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin!;
  }

  const authParams = imagekit.getAuthenticationParameters();

  return new NextResponse(JSON.stringify(authParams), {
    status: 200,
    headers,
  });
};

// Handler OPTIONS
export const OPTIONS = async (req: Request) => {
  const origin = req.headers.get("origin");

  const headers: HeadersInit = {
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin!;
  }

  return new NextResponse(null, {
    status: 204,
    headers,
  });
};
