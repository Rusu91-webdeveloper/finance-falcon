import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function Auth() {
  return (
    <header className="text-2xl border px-4 py-2 rounded-xl bg-slate-200 text-black mx-auto">
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <Navigate to="/dashboard" />
      </SignedIn>
    </header>
  );
}
