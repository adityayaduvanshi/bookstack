// // import { auth } from '@/lib/auth';

// // export default auth((req) => {
// //   // req.auth
// // });

// // // Optionally, don't invoke Middleware on some paths
// // export const config = {
// //   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// // };

// // import { auth } from '@/lib/auth';
// // import { NextRequest, NextResponse } from 'next/server';

// // export default auth((req) => {
// //   // req.auth
// // });

// // // Optionally, don't invoke Middleware on some paths
// // export function middleware(request: NextRequest) {
// //   const hostname = request.headers.get('host') || '';
// //   const url = request.nextUrl;

// //   // Check if the hostname is the base domain (e.g., localhost:3000)
// //   if (hostname === 'localhost:3000') {
// //     // Check if the user is visiting the /blog route
// //     if (url.pathname.startsWith('/blog')) {
// //       // Redirect to the blog subdomain without appending the requested path
// //       const subdomain = `blog.${hostname}`;
// //       const newUrl = `http://${subdomain}`;
// //       return NextResponse.redirect(newUrl);
// //     }
// //   }

// //   // Check if the subdomain is specifically 'blog.'
// //   if (hostname === 'blog.localhost:3000') {
// //     return NextResponse.rewrite(new URL(`/blog`, request.url));
// //   }

// //   // Handle other subdomains here...

// //   // If no subdomain is matched, proceed with the default route
// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: '/:path*',
// // };

// import { auth } from '@/lib/auth';
// import { NextRequest, NextResponse } from 'next/server';

// export default auth((req) => {
//   // req.auth
// });

// // Optionally, don't invoke Middleware on some paths
// export function middleware(request: NextRequest) {
//   const hostname = request.headers.get('host') || '';
//   const url = request.nextUrl;

//   // Check if the hostname is the base domain (e.g., localhost:3000)
//   if (hostname === 'localhost:3000') {
//     // Check if the user is visiting the /blog route
//     if (url.pathname.startsWith('/blog')) {
//       // Redirect to the blog subdomain without appending the requested path
//       const subdomain = `blog.${hostname}`;
//       const newUrl = `http://${subdomain}`;
//       return NextResponse.redirect(newUrl);
//     }
//   }

//   // Check if the subdomain is specifically 'blog.'
//   if (hostname === 'blog.localhost:3000') {
//     return NextResponse.rewrite(new URL(`/blog`, request.url));
//   }

//   // Handle other subdomains here...

//   // If no subdomain is matched, proceed with the default route
//   return NextResponse.next();
// }

// export const config = {
//   matcher: '/:path*',
// };

import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

// Middleware function to handle authentication and subdomain routing
export default auth((req: NextRequest) => {
  // req.auth is available here
});

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  // Handle base domain requests (e.g., localhost:3000)
  if (hostname === 'localhost:3000') {
    return NextResponse.next();
  }

  // Handle other subdomains dynamically
  const subdomain = hostname.split('.')[0];
  if (subdomain && subdomain !== 'www' && subdomain !== 'localhost:3000') {
    const newUrl = url.clone();
    newUrl.pathname = `/subdomains/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(newUrl);
  }

  // Proceed with the default route if no subdomain is matched
  return NextResponse.next();
}

// Configure the matcher to apply middleware to specific paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
