import type { Metadata } from "next"
import "./globals.css"


export const metadata: Metadata = {
title: "Technical Assignment",
description: "Avaier Labs Technocal Assignment",
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body>{children}</body>
</html>
)
}