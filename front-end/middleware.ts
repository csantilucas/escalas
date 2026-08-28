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

  // 2. Mapeamento das rotas protegidas e administrativas
  const isAdminRoute =
    pathname.startsWith("/usuarios") ||
    pathname.startsWith("/plantonistas") ||
    pathname.startsWith("/equipes") ||
    pathname.startsWith("/escalas") ||
    pathname.startsWith("/tokens") ||
    pathname.startsWith("/tomticket") ||
    pathname.startsWith("/relatorios-escalas") ||
    pathname.startsWith("/logs");

  const isPrivateRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/atendimentos") ||
    pathname.startsWith("/distribuicao") ||
    pathname.startsWith("/registros") ||
    isAdminRoute;

  const isPublicRoute = pathname.startsWith("/login");

  // Caso 1: Rota privada sem sessão -> Redirecionar para /login
  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Caso 2: Já autenticado tentando acessar /login -> Redirecionar para /dashboard
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Caso 3: Rota exclusiva de administrador acessada por perfil não-admin
  if (isAdminRoute && userCookie) {
    try {
      const user = JSON.parse(decodeURIComponent(userCookie));
      const isAdmin =
        user.role === "admin" ||
        user.typeUser === "admin" ||
        user.role?.toLowerCase() === "admin" ||
        user.typeUser?.toLowerCase() === "admin";

      if (!isAdmin) {
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