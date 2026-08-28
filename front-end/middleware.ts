// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userCookie = request.cookies.get('user')?.value;
  const { pathname } = request.nextUrl;

  // 1. Evita interceptar a rota raiz pura para deixar o app/page.tsx decidir de forma limpa
  if (pathname === '/') {
    return NextResponse.next();
  }

  // 2. Mapeamento estrito das rotas
  const isAdminRoute = pathname.startsWith('/usuarios') || pathname.startsWith('/plantonistas') || pathname.startsWith('/escalas');
  const isPrivateRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/registros') || isAdminRoute;
  const isPublicRoute = pathname.startsWith('/login');

  // Caso 1: Privada sem token -> Login
  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Caso 2: Já logado tentando ir pro login -> Dashboard
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Caso 3: Rota Admin sem ser admin -> Dashboard
  if (isAdminRoute && userCookie) {
    try {
      const user = JSON.parse(decodeURIComponent(userCookie));
      if (user.typeUser !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      response.cookies.delete('user');
      return response;
    }
  }

  return NextResponse.next();
}

// 🟢 CORREÇÃO CRÍTICA DO MATCHER: Ignorar explicitamente assets, arquivos internos e o HMR do Turbopack
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|styles|assets).*)',
  ],
};