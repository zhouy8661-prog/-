import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-12 flex items-center justify-center">
        <div className="text-center px-6 py-16">
          <p className="text-sm text-[#a0a0a0] mb-4">Page not found</p>
          <Link
            href="/"
            className="text-sm text-white hover:text-[#e5e5e5] transition-colors duration-150 underline underline-offset-4"
          >
            Back to Portfolio
          </Link>
        </div>
      </main>
    </>
  );
}
