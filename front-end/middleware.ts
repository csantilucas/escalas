import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("token")?.value;
  const userCookie = request.cookies.get("user")?.value;
  const { pathname } = request.nextUrl;

  // 1. Não intercepta a rota raiz pura para deixar o app/page.tsx decidir
  if (pathname === "/") {
    return NextResponse.next();
  }

  // 2. Mapeamento das rotas por nível de permissão
  const isStrictAdminRoute =
    pathname.startsWith("/usuarios") ||
    pathname.startsWith("/tokens") ||
    pathname.startsWith("/logs");

  const isGestorAllowedRoute =
    pathname.startsWith("/tomticket");

  const isPrivateRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/perfil") ||
    pathname.startsWith("/tv") ||
    pathname.startsWith("/atendimentos") ||
    pathname.startsWith("/distribuicao") ||
    pathname.startsWith("/equipes") ||
    pathname.startsWith("/plantonistas") ||
    pathname.startsWith("/escalas") ||
    pathname.startsWith("/relatorios-escalas") ||
    isStrictAdminRoute ||
    isGestorAllowedRoute;

  const isPublicRoute = pathname.startsWith("/login");

  // Caso 1: Rota privada sem sessão -> Redirecionar para /login
  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Caso 2: Já autenticado tentando acessar /login -> Redirecionar para /dashboard
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Caso 3: Validação granular de permissões quando usuário acessa rotas restritas
  if ((isStrictAdminRoute || isGestorAllowedRoute) && userCookie) {
    try {
      const user = JSON.parse(decodeURIComponent(userCookie));
      const role = String(user.role || user.typeUser || "").toLowerCase();
      const isAdmin = role === "admin";
      const isGestor = role === "gestor";

      // Rotas estritas de admin (/usuarios, /tokens, /logs): apenas admin
      if (isStrictAdminRoute && !isAdmin) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // Rota tomticket: apenas admin ou gestor (comum bloqueado)
      if (isGestorAllowedRoute && !isAdmin && !isGestor) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("better-auth.session_token");
      response.cookies.delete("token");
      response.cookies.delete("user");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|styles|assets).*)",
  ],
};