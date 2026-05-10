export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "tecnico" | "qualidade" | "viewer";
  avatarInitials: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: number;
}

export type AuthStatus =
  | "idle"
  | "loading"
  | "authenticated"
  | "unauthenticated";

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
