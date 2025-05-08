interface IBookDetail {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  videoUrl: string;
  summary: string;
  isLoanedBook?: boolean;
}

interface IAuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface IAuthResult {
  success: boolean;
  message?: string;
}

interface IAuthResponse {
  signature: string;
  expire: number;
  token: string;
}
