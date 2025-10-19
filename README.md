# IT Asset Management System

Sistem manajemen aset IT untuk 900+ coffee shop store di Indonesia.

## 🚀 Features

- ✅ **Authentication System** - 2 level user access (Admin & Store User)
- ✅ **Dashboard** - Real-time stats dan recent activities
- ✅ **Device Management** - CRUD devices dengan FAMCODE & serial number
- ✅ **Store Management** - Management 900+ store locations
- ✅ **Asset Transfer** - Transfer antar store dengan approval workflow
- ✅ **Barcode Scanner** - Scan barcode atau manual input
- ✅ **Import/Export** - CSV/Excel functionality
- ✅ **Responsive Design** - Desktop & mobile friendly

## 📱 Demo Accounts

### Admin Access
- **Email**: admin@company.com
- **Password**: admin123
- **Access**: Semua fitur

### Store User Access
- **Email**: store@company.com
- **Password**: store123
- **Access**: Limited to assigned store

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, shadcn/ui, Lucide Icons
- **Database**: Prisma ORM, SQLite (local) / PostgreSQL (production)
- **Authentication**: Custom auth system
- **Deployment**: Netlify ready

## 📦 Installation

### Local Development
```bash
# Clone repository
git clone <repository-url>
cd it-asset-management

# Install dependencies
npm install

# Setup database
npm run db:push
npx tsx prisma/seed.ts

# Start development server
npm run dev
```

### Netlify Deployment

#### Option 1: Manual Deploy
1. Push code ke GitHub
2. Connect ke Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`

#### Option 2: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy
netlify deploy --prod
```

## 🔧 Environment Variables

### Local Development
```env
DATABASE_URL="file:./dev.db"
```

### Netlify Production
```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── login/          # Login page
│   └── page.tsx        # Dashboard
├── components/ui/       # shadcn/ui components
├── contexts/           # React contexts
└── lib/               # Utilities and database

prisma/
├── schema.prisma      # Database schema
└── seed.ts           # Database seeder

netlify/functions/     # Netlify serverless functions
```

## 🏪 Store Codes

System supports 900+ stores dengan format:
- `JKT.LTSHAVNU` - Lotte Mall Jakarta (LG)
- `JKT.ONESTR` - Kenangan Signature One Satrio
- `KK.JKT.RKMLKSR` - Ruko Malaka Sari
- `KK.JKT.RKPNDKKLPA` - Ruko Pondok Kelapa
- `KK.BKS.RKHKMJTWN` - Ruko Hankam Jatiwarna
- `KK.JKT.RKMTRMNJT` - Ruko Matraman Jakarta Timur

## 🚀 Deployment ke Netlify

### Step 1: Prepare untuk Production
```bash
# Build untuk production
npm run build

# Test build locally
npm start
```

### Step 2: Deploy ke Netlify
1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Setup Netlify**
   - Login ke [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Add environment variables

3. **Custom Domain (Optional)**
   - Add custom domain di Netlify dashboard
   - Update DNS settings

## 🌐 Live Demo

Setelah deploy, aplikasi akan accessible di:
- **URL**: `https://your-app.netlify.app`
- **Login**: Gunakan demo accounts di atas

## 📊 Database Options

### Local Development
- **SQLite** (default) - File-based, no setup required

### Production
- **PostgreSQL** - Recommended untuk production
- **MySQL** - Alternative option
- **PlanetScale** - Serverless PostgreSQL
- **Supabase** - Open source Firebase alternative

## 🔒 Security Features

- Password hashing dengan bcryptjs
- Role-based access control
- Input validation
- CORS protection
- Session management

## 📱 Mobile Support

- Responsive design untuk semua device
- Touch-friendly interface
- Progressive Web App (PWA) ready

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push ke branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file untuk details

## 🆘 Support

Untuk support atau questions:
- Email: support@company.com
- Documentation: [Wiki](https://github.com/username/repo/wiki)
- Issues: [GitHub Issues](https://github.com/username/repo/issues)