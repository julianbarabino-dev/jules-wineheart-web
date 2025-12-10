import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Simplemente deja pasar la petición.
  // Si tenías lógica de internacionalización aquí, la IA la rompió.
  // Por ahora, esto hará que tu web VUELVA A FUNCIONAR y cargue las imágenes.
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas de solicitud excepto las que comienzan con:
     * - api (rutas API)
     * - _next/static (archivos estáticos)
     * - _next/image (archivos de optimización de imágenes)
     * - favicon.ico (archivo favicon)
     * - Cualquier archivo con extensión (ej: .svg, .png, .jpg, .mp3)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
