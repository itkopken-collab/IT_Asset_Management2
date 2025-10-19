import type { AppProps } from 'next/app'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/contexts/auth-context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
  )
}