// middleware/checkAuth.js
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from "next/server"
const secret = process.env.JWT_SECRET;

export default async function checkAuth(req, res, next) {
  const token = await getToken({ req, secret });
  // if (!token) {
  //   res.writeHead(302, { Location: '/' });
  //   res.end();
  //   return;
  // }

  req.user = token;
  NextResponse.next()
}
