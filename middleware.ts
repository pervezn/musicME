import { getToken } from "next-auth/jwt"
import {NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const config = {
    matcher: ['/login', '/']
}

export async function middleware(req: NextRequest) {
    const token = await getToken({req, secret: process.env.JWT_SECRET})

    if(req.nextUrl.pathname.includes('/api/auth') || token ) {
        return NextResponse.next();
    }

    if(req.nextUrl.pathname.includes('/login')) {
        return NextResponse.next();
    }

    if(!token || req.nextUrl.pathname !== '/login'){
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    } 

}