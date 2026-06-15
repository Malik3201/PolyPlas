import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-warm-accent font-serif text-6xl font-bold mb-4">404</p>
        <h1 className="heading-display text-3xl text-charcoal mb-4">Page not found</h1>
        <p className="text-stone-600 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-primary"
          >
            <Home size={16} />
            Go Home
          </Link>
          <Link
            href="/products"
            className="btn-outline"
          >
            <ArrowLeft size={16} />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
