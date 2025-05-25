// pages/protected.js
import { useSession, signIn, signOut } from 'next-auth/react';

export default function ProtectedPage() {
    // const { data: session } = useSession();;

  // if (!session) {
  //   return (
  //     <div>
  //       <p>You are not authenticated. Please sign in.</p>
  //       <button onClick={() => signIn()}>Sign In</button>
  //     </div>
  //   );
  // }

  return (
    <div>
      <p>Welcome, {session.user.name}!</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
