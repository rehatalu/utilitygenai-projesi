import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Sadece /api/ ile başlayan rotaları kontrol et
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // İsteğin nereden geldiğini (Origin) al
    const origin = request.headers.get("origin");

    // İzin verilen domainler (Kendi siteniz ve localhost)
    const allowedOrigins = [
      "https://utilitygenai.com",
      "https://www.utilitygenai.com",
      "http://localhost:3000", // Geliştirme aşaması için gerekli
    ];

    // Eğer bir Origin varsa (tarayıcıdan geliyorsa) ve listemizde yoksa engelle
    if (origin && !allowedOrigins.includes(origin)) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized: Domain not allowed" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // İzin verilen Origin ise, cevap başlıklarına CORS ekle
    const response = NextResponse.next();

    if (origin) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return response;
  }

  // API dışındaki sayfalar için normal devam et
  return NextResponse.next();
}

// Middleware'in çalışacağı yollar
export const config = {
  matcher: "/api/:path*",
};
