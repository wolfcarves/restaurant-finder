import './globals.css';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ReactQueryProvider from '@/providers/react-query';
import SearchProvider from '@/context/search-provider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Your AI Place Finder',
    description: 'A tool that helps you to find the best place you never seen before XD',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReactQueryProvider>
            <SearchProvider>
                <Suspense>
                    <html lang="en">
                        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                            <main className="h-screen">{children}</main>
                        </body>
                    </html>
                </Suspense>
            </SearchProvider>
        </ReactQueryProvider>
    );
}
