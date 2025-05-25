// // middleware/checkAuth.js
// import { getToken } from 'next-auth/jwt';
// import { NextRequest, NextResponse } from "next/server"
// const secret = process.env.JWT_SECRET;

// export default async function checkAuth(req, res, next) {
//   const token = await getToken({ req, secret });
//   consolelog('token =>',token)
//   // if (!token) {
//   //   res.writeHead(302, { Location: '/' });
//   //   res.end();
//   //   return;
//   // }

//   req.user = token;
//   NextResponse.next()
// }



import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

export default async function checkAuth(req, res) {
  try {
    const authHeader = req.headers.authorization;
   
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }
    const token = authHeader.split(' ')[1]; 
    const decoded = jwt.verify(token, secret); 
    req.user = decoded; 
    return decoded;
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}