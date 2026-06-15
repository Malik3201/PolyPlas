import { Suspense } from "react";
import LoginForm from "./LoginForm";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-ivory-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-charcoal items-center justify-center mb-4">
            <Lock size={20} className="text-ivory-200" />
          </div>
          <h1 className="font-serif text-2xl text-charcoal">Admin Panel</h1>
          <p className="text-stone-500 text-sm mt-1">Enter your password to continue</p>
        </div>
        <Suspense fallback={<div className="bg-white rounded-2xl shadow-warm p-6 border border-stone-100 h-32 animate-pulse" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
