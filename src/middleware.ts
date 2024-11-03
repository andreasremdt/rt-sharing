import { NextResponse, type NextRequest } from "next/server";
import createClient from "@/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (data.user) {
      return NextResponse.redirect(new URL("/files", request.url), {
        status: 302,
      });
    }

    return NextResponse.next();
  }

  if (!data.user) {
    return NextResponse.redirect(new URL("/auth/login", request.url), {
      status: 302,
    });
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/files",
  ],
};
