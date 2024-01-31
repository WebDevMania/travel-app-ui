import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <h2 className="font-bold text-4xl text-slate-800">Page not found</h2>
            <Link className="font-semibold text-slate-600 transition hover:text-slate-500" href="/">
                Return to Home
            </Link>
        </div>
    );
}