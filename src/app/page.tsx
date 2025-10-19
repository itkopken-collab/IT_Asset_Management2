"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Package, 
  Users, 
  Store, 
  BarChart3, 
  Settings, 
  Plus,
  Upload,
  Download,
  Scan,
  ArrowRightLeft,
  LogOut,
  User
} from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const statsCards = [
    {
      title: "Total Devices",
      value: "1,234",
      change: "+12%",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Active Stores", 
      value: "856",
      change: "+3%",
      icon: Store,
      color: "text-green-600"
    },
    {
      title: "Pending Transfers",
      value: "23",
      change: "-5%",
      icon: ArrowRightLeft,
      color: "text-orange-600"
    },
    {
      title: "Devices Need Service",
      value: "45",
      change: "+8%",
      icon: Settings,
      color: "text-red-600"
    }
  ]

  const recentActivities = [
    { id: 1, action: "Device Added", device: "Laptop Dell Latitude", store: "JKT.LTSHAVNU", time: "2 hours ago" },
    { id: 2, action: "Transfer Requested", device: "Printer HP", store: "KK.JKT.RKMLKSR", time: "4 hours ago" },
    { id: 3, action: "Device Repaired", device: "Monitor Samsung", store: "JKT.ONESTR", time: "6 hours ago" },
    { id: 4, action: "New Store Added", device: "-", store: "KK.BKS.RKHKMJTWN", time: "1 day ago" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">IT Asset Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4" />
                <span className="font-medium">{user.name || user.email}</span>
                <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                  {user.role === 'ADMIN' ? 'Admin' : 'Store User'}
                </Badge>
                {user.store && (
                  <Badge variant="outline">
                    {user.store.storeCode}
                  </Badge>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              <Button
                variant={activeTab === 'overview' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('overview')}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === 'devices' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('devices')}
              >
                <Package className="h-4 w-4 mr-2" />
                Devices
              </Button>
              <Button
                variant={activeTab === 'stores' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('stores')}
                disabled={user.role !== 'ADMIN'}
              >
                <Store className="h-4 w-4 mr-2" />
                Stores
              </Button>
              <Button
                variant={activeTab === 'transfers' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('transfers')}
              >
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Transfers
              </Button>
              <Button
                variant={activeTab === 'users' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('users')}
                disabled={user.role !== 'ADMIN'}
              >
                <Users className="h-4 w-4 mr-2" />
                Users
              </Button>
              <Button
                variant={activeTab === 'scanner' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('scanner')}
              >
                <Scan className="h-4 w-4 mr-2" />
                Barcode Scanner
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                  Overview of IT assets across all coffee shop stores
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        {stat.change} from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>
                    Latest device and store activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.device !== "-" ? `${activity.device} - ` : ""}
                            {activity.store}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Devices Tab */}
            <TabsContent value="devices" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Devices</h2>
                  <p className="text-muted-foreground">
                    Manage IT devices across all stores
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import CSV
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Device
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Device List</CardTitle>
                  <CardDescription>
                    View and manage all IT devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No devices yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Get started by adding your first device or importing from CSV
                    </p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Import Devices
                      </Button>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Device
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Stores Tab - Admin Only */}
            {user.role === 'ADMIN' && (
              <TabsContent value="stores" className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Stores</h2>
                    <p className="text-muted-foreground">
                      Manage coffee shop store locations
                    </p>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Store
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Store Locations</CardTitle>
                    <CardDescription>
                      Active coffee shop stores with IT assets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {[
                        { code: "JKT.LTSHAVNU", name: "Lotte Mall Jakarta (LG)", devices: 45 },
                        { code: "JKT.ONESTR", name: "Kenangan Signature One Satrio", devices: 38 },
                        { code: "KK.JKT.RKMLKSR", name: "Ruko Malaka Sari", devices: 32 },
                        { code: "KK.JKT.RKPNDKKLPA", name: "Ruko Pondok Kelapa", devices: 28 },
                        { code: "KK.BKS.RKHKMJTWN", name: "Ruko Hankam Jatiwarna", devices: 35 },
                        { code: "KK.JKT.RKMTRMNJT", name: "Ruko Matraman Jakarta Timur", devices: 41 }
                      ].map((store, index) => (
                        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-sm">{store.name}</CardTitle>
                                <CardDescription className="text-xs">{store.code}</CardDescription>
                              </div>
                              <Badge variant="secondary">{store.devices} devices</Badge>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Transfers Tab */}
            <TabsContent value="transfers" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Asset Transfers</h2>
                  <p className="text-muted-foreground">
                    Manage device transfers between stores
                  </p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Request Transfer
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Transfer Requests</CardTitle>
                  <CardDescription>
                    Pending and completed asset transfers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <ArrowRightLeft className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No transfer requests</h3>
                    <p className="text-muted-foreground mb-4">
                      Transfer requests will appear here
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Transfer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab - Admin Only */}
            {user.role === 'ADMIN' && (
              <TabsContent value="users" className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                    <p className="text-muted-foreground">
                      Manage user access and permissions
                    </p>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      System users and their access levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No users yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Add users to manage the system
                      </p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add First User
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Scanner Tab */}
            <TabsContent value="scanner" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Barcode Scanner</h2>
                <p className="text-muted-foreground">
                  Scan device barcodes or enter serial numbers manually
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Device Scanner</CardTitle>
                  <CardDescription>
                    Quick device lookup using barcode or serial number
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Scan className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Barcode Scanner</h3>
                    <p className="text-muted-foreground mb-4">
                      Use camera to scan barcodes or enter serial number manually
                    </p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline">
                        <Scan className="h-4 w-4 mr-2" />
                        Start Scanning
                      </Button>
                      <Button variant="outline">
                        Manual Entry
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}