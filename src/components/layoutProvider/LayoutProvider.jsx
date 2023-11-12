// Use the client directive for using usePathname hook.
'use client'

// Use usePathname for catching route name.
import { usePathname } from 'next/navigation';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

export const LayoutProvider = ({ children }) => {
    const pathname = usePathname();
    
    return (
        <>
            {pathname !== '/login' && pathname !== '/signup' && <Navbar />}
            {children}
            {pathname !== '/login' && pathname !== '/signup' && <Footer />}
        </>
    )
};