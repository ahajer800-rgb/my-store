export const metadata = {
  title: 'متجري الإلكتروني',
  description: 'أفضل المنتجات وأسهل طرق الطلب عبر الواتساب',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}