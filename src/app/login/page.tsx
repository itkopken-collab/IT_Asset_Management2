"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedStore, setSelectedStore] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const stores = [
    { code: "JKT.LTSHAVNU", name: "Lotte Mall Jakarta (LG)" },
    { code: "JKT.ONESTR", name: "Kenangan Signature One Satrio" },
    { code: "KK.JKT.RKMLKSR", name: "Ruko Malaka Sari" },
    { code: "KK.JKT.RKPNDKKLPA", name: "Ruko Pondok Kelapa" },
    { code: "KK.BKS.RKHKMJTWN", name: "Ruko Hankam Jatiwarna" },
    { code: "KK.JKT.RKMTRMNJT", name: "Ruko Matraman Jakarta Timur" }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // For Netlify static deployment, use demo authentication
      const demoUsers = [
        {
          email: 'admin@company.com',
          password: 'admin123',
          role: 'ADMIN',
          id: 'admin-1',
          name: 'System Administrator'
        },
        {
          email: 'store@company.com',
          password: 'store123',
          role: 'STORE_USER',
          id: 'store-1',
          name: 'Store Manager',
          storeCode: 'JKT.LTSHAVNU',
          store: {
            storeCode: 'JKT.LTSHAVNU',
            storeName: 'Lotte Mall Jakarta (LG)'
          }
        },
        {
          email: 'store2@company.com',
          password: 'store123',
          role: 'STORE_USER',
          id: 'store-2',
          name: 'Store Manager 2',
          storeCode: 'JKT.ONESTR',
          store: {
            storeCode: 'JKT.ONESTR',
            storeName: 'Kenangan Signature One Satrio'
          }
        }
      ]

      const user = demoUsers.find(u => u.email === email && u.password === password)

      if (!user) {
        setError('Invalid credentials')
        setIsLoading(false)
        return
      }

      // For store users, validate store assignment
      if (user.role === 'STORE_USER') {
        if (!selectedStore) {
          setError('Store selection is required for store users')
          setIsLoading(false)
          return
        }

        if (user.storeCode !== selectedStore) {
          setError('You are not assigned to this store')
          setIsLoading(false)
          return
        }
      }

      // Generate token
      const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      
      router.push('/')

    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            IT Asset Management
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage your IT assets
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store">Store (Optional for Store Users)</Label>
                <Select value={selectedStore} onValueChange={setSelectedStore}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your store" />
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store.code} value={store.code}>
                        {store.name} ({store.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Demo Accounts:</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>Admin:</strong> admin@company.com / admin123</p>
                <p><strong>Store User:</strong> store@company.com / store123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}