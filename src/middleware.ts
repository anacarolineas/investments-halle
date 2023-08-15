export { default } from "next-auth/middleware"

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from "next-auth/react";
 
export async function middleware(request: NextRequest, response: NextResponse) {
   const requestForNextAuth: any = {
    headers: {
      cookie: request.headers.get("cookie"),
    },
  };

  const session = await getSession({ req: requestForNextAuth });  

  if (session) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', request.url))
}
 
export const config = {
  matcher: ["/", "/wallet/:path*"],
}