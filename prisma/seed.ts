import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create device categories
  const laptopCategory = await prisma.deviceCategory.upsert({
    where: { name: 'Laptop' },
    update: {},
    create: {
      name: 'Laptop',
      description: 'Laptop computers for store operations'
    }
  })

  const printerCategory = await prisma.deviceCategory.upsert({
    where: { name: 'Printer' },
    update: {},
    create: {
      name: 'Printer',
      description: 'Printers for receipts and documents'
    }
  })

  const monitorCategory = await prisma.deviceCategory.upsert({
    where: { name: 'Monitor' },
    update: {},
    create: {
      name: 'Monitor',
      description: 'Computer monitors'
    }
  })

  const posCategory = await prisma.deviceCategory.upsert({
    where: { name: 'POS System' },
    update: {},
    create: {
      name: 'POS System',
      description: 'Point of Sale systems'
    }
  })

  console.log('✅ Device categories created')

  // Create stores
  const stores = [
    {
      storeCode: 'JKT.LTSHAVNU',
      storeName: 'Lotte Mall Jakarta (LG)',
      address: 'Lotte Mall Jakarta, LG Floor',
      phone: '021-1234567'
    },
    {
      storeCode: 'JKT.ONESTR',
      storeName: 'Kenangan Signature One Satrio',
      address: 'Jl. Prof. Dr. Satrio No. 1',
      phone: '021-2345678'
    },
    {
      storeCode: 'KK.JKT.RKMLKSR',
      storeName: 'Ruko Malaka Sari',
      address: 'Ruko Malaka Sari Blok A No. 15',
      phone: '021-3456789'
    },
    {
      storeCode: 'KK.JKT.RKPNDKKLPA',
      storeName: 'Ruko Pondok Kelapa',
      address: 'Ruko Pondok Kelapa Blok B No. 22',
      phone: '021-4567890'
    },
    {
      storeCode: 'KK.BKS.RKHKMJTWN',
      storeName: 'Ruko Hankam Jatiwarna',
      address: 'Ruko Hankam Jatiwarna Blok C No. 8',
      phone: '021-5678901'
    },
    {
      storeCode: 'KK.JKT.RKMTRMNJT',
      storeName: 'Ruko Matraman Jakarta Timur',
      address: 'Ruko Matraman Jakarta Timur Blok D No. 33',
      phone: '021-6789012'
    }
  ]

  const createdStores: any[] = []
  for (const storeData of stores) {
    const store = await prisma.store.upsert({
      where: { storeCode: storeData.storeCode },
      update: {},
      create: storeData
    })
    createdStores.push(store)
  }

  console.log('✅ Stores created')

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10)
  const storePassword = await bcrypt.hash('store123', 10)

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@company.com' },
    update: {},
    create: {
      email: 'admin@company.com',
      name: 'System Administrator',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

  // Create store users
  const storeUsers = [
    {
      email: 'store@company.com',
      name: 'Store Manager',
      storeCode: 'JKT.LTSHAVNU'
    },
    {
      email: 'store2@company.com',
      name: 'Store Manager 2',
      storeCode: 'JKT.ONESTR'
    }
  ]

  for (const userData of storeUsers) {
    const store = createdStores.find(s => s.storeCode === userData.storeCode)
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        name: userData.name,
        password: storePassword,
        role: 'STORE_USER',
        storeId: store?.id
      }
    })
  }

  console.log('✅ Users created')

  // Create sample devices
  const sampleDevices = [
    {
      famCode: 'FAM3233211',
      serialNumber: 'SN001234567',
      deviceName: 'Laptop Dell Latitude',
      model: 'Latitude 5420',
      brand: 'Dell',
      storeCode: 'JKT.LTSHAVNU',
      categoryName: 'Laptop',
      status: 'BAIK' as const,
      purchasePrice: 12500000,
      notes: 'Laptop for cashier operations'
    },
    {
      famCode: 'FAM3233212',
      serialNumber: 'SN001234568',
      deviceName: 'Printer HP Thermal',
      model: 'HP Thermal Receipt',
      brand: 'HP',
      storeCode: 'JKT.ONESTR',
      categoryName: 'Printer',
      status: 'BAIK' as const,
      purchasePrice: 2500000,
      notes: 'Receipt printer for POS'
    },
    {
      famCode: 'FAM3233213',
      serialNumber: 'SN001234569',
      deviceName: 'Monitor Samsung 24"',
      model: 'S24F350',
      brand: 'Samsung',
      storeCode: 'KK.JKT.RKMLKSR',
      categoryName: 'Monitor',
      status: 'RUSAK' as const,
      purchasePrice: 1800000,
      notes: 'Monitor flickering, needs repair'
    },
    {
      famCode: 'FAM3233214',
      serialNumber: 'SN001234570',
      deviceName: 'POS System Touch',
      model: 'POS-Touch-15',
      brand: 'TouchPoint',
      storeCode: 'KK.JKT.RKPNDKKLPA',
      categoryName: 'POS System',
      status: 'ON_SERVICE' as const,
      purchasePrice: 8500000,
      notes: 'Sent for repair on 15/01/2024'
    }
  ]

  for (const deviceData of sampleDevices) {
    const store = createdStores.find(s => s.storeCode === deviceData.storeCode)
    const category = await prisma.deviceCategory.findUnique({
      where: { name: deviceData.categoryName }
    })

    if (store && category) {
      const { storeCode, categoryName, ...deviceFields } = deviceData
      await prisma.device.upsert({
        where: { famCode: deviceData.famCode },
        update: {},
        create: {
          ...deviceFields,
          categoryId: category.id,
          storeId: store.id,
          purchaseDate: new Date('2024-01-01'),
          warrantyUntil: new Date('2025-01-01')
        }
      })
    }
  }

  console.log('✅ Sample devices created')
  console.log('🎉 Database seeding completed successfully!')

  // Print login credentials
  console.log('\n📋 Login Credentials:')
  console.log('🔑 Admin: admin@company.com / admin123')
  console.log('🔑 Store User: store@company.com / store123')
  console.log('🔑 Store User 2: store2@company.com / store123')

}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })