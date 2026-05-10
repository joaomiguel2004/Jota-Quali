export const ROUTES = {
  login: "/login",
  register: "/cadastro",
  forgotPassword: "/recuperar-senha",
  resetPassword: "/redefinir-senha",
  dashboard: "/",
  equipamentos: "/equipamentos",
  calibracao: "/calibracao",
  laudos: "/laudos",
  assinaturaDigital: "/assinatura-digital",
  rastreabilidade: "/rastreabilidade",
  usuarios: "/usuarios",
  configuracoes: "/configuracoes",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
