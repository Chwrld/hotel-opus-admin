# Hotel Reservation Management System - Admin Interface

A comprehensive, responsive admin dashboard for hotel reservation management built with React, TypeScript, Tailwind CSS, and Chart.js. Designed for easy integration with Laravel backend.

## 🏨 Features

### Core Pages
- **Dashboard**: KPI cards, revenue analytics, recent reservations
- **Reservations**: List/calendar view, status management, guest info
- **Rooms**: CRUD operations, image upload UI, availability indicators
- **Users**: Employee management, role assignment, activation controls
- **Reports**: Generate exports (CSV/PDF), receptionist performance tracking
- **Settings**: System configuration, notifications, security settings

### Key Capabilities
- 📱 **Mobile-first responsive design**
- 📊 **Interactive charts with Chart.js**
- 🎨 **Professional hotel-themed design system**
- ♿ **Accessible with semantic HTML and ARIA attributes**
- 🔧 **Role-based UI visibility**
- 📈 **Real-time data visualization**

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🎨 Design System

The application uses a comprehensive design system with semantic tokens:

### Colors
- **Primary**: Hotel Navy Blue (`hsl(214, 84%, 25%)`)
- **Accent**: Luxury Gold (`hsl(45, 93%, 47%)`)
- **Success**: Green (`hsl(142, 76%, 36%)`)
- **Warning**: Amber (`hsl(38, 92%, 50%)`)
- **Destructive**: Red (`hsl(0, 84%, 60%)`)

### Gradients
- `--gradient-primary`: Primary blue gradient
- `--gradient-accent`: Gold accent gradient
- `--gradient-card`: Subtle card background gradient

## 📡 API Integration

### Authentication Endpoints
```typescript
// Login
POST /api/admin/login
Request: { email: string, password: string }
Response: { token: string, user: User }

// Logout
POST /api/admin/logout
Headers: { Authorization: "Bearer {token}" }
```

### Employee Management
```typescript
// List employees
GET /api/admin/employees?page=1&search=&role=
Response: { data: Employee[], pagination: Pagination }

// Create employee
POST /api/admin/employees
Request: { name: string, email: string, phone: string, role: string }
Response: { employee: Employee }

// Update employee
PUT /api/admin/employees/{id}
Request: { name?: string, email?: string, role?: string, is_active?: boolean }

// Delete employee
DELETE /api/admin/employees/{id}
```

### Room Management
```typescript
// List rooms
GET /api/admin/rooms?type=&status=&availability=
Response: { data: Room[], pagination: Pagination }

// Create room
POST /api/admin/rooms
Request: {
  room_number: string,
  type: string,
  description: string,
  rate: number,
  max_occupancy: number,
  amenities: string[],
  images: string[]
}

// Get room availability
GET /api/admin/rooms/{id}/availability?from=YYYY-MM-DD&to=YYYY-MM-DD
Response: { available_dates: string[], occupied_dates: string[] }
```

### Reservation Management
```typescript
// List reservations
GET /api/admin/reservations?from=&to=&status=&payment_status=
Response: { data: Reservation[], pagination: Pagination }

// Create reservation
POST /api/admin/reservations
Request: {
  user_id: number,
  room_id: number,
  check_in: string,
  check_out: string,
  total_price: number,
  guest_name: string,
  guest_email: string,
  guest_phone: string
}

// Update reservation status
PUT /api/admin/reservations/{id}
Request: { status: string, payment_status?: string, room_id?: number }
```

### Reports & Analytics
```typescript
// Get dashboard data
GET /api/admin/reports/dashboard?days=30
Response: {
  kpis: {
    revenue: number,
    todays_reservations: number,
    occupancy: number,
    active_users: number
  },
  chart: {
    labels: string[],
    datasets: ChartDataset[]
  },
  recent_reservations: Reservation[]
}

// Generate sales report
GET /api/admin/reports/sales?from=&to=&receptionist_id=&format=csv
Response: { download_url: string } | CSV/PDF file
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'receptionist', 'staff') DEFAULT 'staff',
    is_active BOOLEAN DEFAULT TRUE,
    email_verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_role (role),
    INDEX idx_active (is_active)
);
```

### Rooms Table
```sql
CREATE TABLE rooms (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    room_number VARCHAR(10) UNIQUE NOT NULL,
    type ENUM('Standard', 'Deluxe', 'Suite', 'Family Room', 'Presidential Suite') NOT NULL,
    description TEXT,
    rate DECIMAL(10,2) DEFAULT 0,
    max_occupancy TINYINT DEFAULT 1,
    amenities JSON,
    images JSON,
    status ENUM('available', 'occupied', 'maintenance', 'disabled') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_occupancy (max_occupancy)
);
```

### Reservations Table
```sql
CREATE TABLE reservations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    room_id BIGINT NOT NULL,
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255),
    guest_phone VARCHAR(20),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled') DEFAULT 'pending',
    payment_status ENUM('unpaid', 'partial', 'paid') DEFAULT 'unpaid',
    created_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_dates (check_in, check_out),
    INDEX idx_status (status),
    INDEX idx_payment (payment_status)
);
```

### Payments Table
```sql
CREATE TABLE payments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    reservation_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    method ENUM('cash', 'card', 'bank_transfer', 'online') NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    transaction_ref VARCHAR(255),
    processed_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE,
    FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_method (method)
);
```

## 🔧 Laravel Integration

### 1. Routes Configuration

**api.php**
```php
<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\ReservationController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\ReportsController;

// Authentication routes
Route::prefix('admin')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    
    // Protected admin routes
    Route::middleware(['auth:sanctum', 'role:admin,manager'])->group(function () {
        Route::apiResource('employees', EmployeeController::class);
        Route::apiResource('rooms', RoomController::class);
        Route::apiResource('reservations', ReservationController::class);
        
        // Room availability
        Route::get('rooms/{room}/availability', [RoomController::class, 'availability']);
        
        // Reports
        Route::get('reports/dashboard', [ReportsController::class, 'dashboard']);
        Route::get('reports/sales', [ReportsController::class, 'sales']);
        Route::get('reports/occupancy', [ReportsController::class, 'occupancy']);
    });
});
```

### 2. Sample Controllers

**ReservationController.php**
```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $query = Reservation::with(['room', 'user', 'creator']);
        
        // Apply filters
        if ($request->filled('from') && $request->filled('to')) {
            $query->whereBetween('created_at', [$request->from, $request->to]);
        }
        
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }
        
        return response()->json($query->paginate(20));
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'guest_name' => 'required|string|max:255',
            'guest_email' => 'nullable|email',
            'guest_phone' => 'nullable|string|max:20',
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'total_price' => 'required|numeric|min:0',
        ]);
        
        $validated['created_by'] = auth()->id();
        
        $reservation = Reservation::create($validated);
        
        return response()->json([
            'reservation' => $reservation->load(['room', 'creator'])
        ], 201);
    }
    
    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'status' => 'nullable|in:pending,confirmed,checked_in,checked_out,cancelled',
            'payment_status' => 'nullable|in:unpaid,partial,paid',
            'room_id' => 'nullable|exists:rooms,id',
        ]);
        
        $reservation->update($validated);
        
        return response()->json([
            'reservation' => $reservation->load(['room', 'user'])
        ]);
    }
    
    public function show(Reservation $reservation)
    {
        return response()->json([
            'reservation' => $reservation->load(['room', 'user', 'payments'])
        ]);
    }
}
```

### 3. Model Relationships

**Reservation Model**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reservation extends Model
{
    protected $fillable = [
        'user_id', 'room_id', 'guest_name', 'guest_email', 'guest_phone',
        'check_in', 'check_out', 'total_price', 'status', 'payment_status', 'created_by'
    ];
    
    protected $casts = [
        'check_in' => 'date',
        'check_out' => 'date',
        'total_price' => 'decimal:2',
    ];
    
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
```

### 4. Authentication Setup

**Install Laravel Sanctum**
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

**Add Sanctum Middleware** (app/Http/Kernel.php)
```php
'api' => [
    Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

### 5. File Upload Configuration

**Storage Configuration** (config/filesystems.php)
```php
'disks' => [
    'public' => [
        'driver' => 'local',
        'root' => storage_path('app/public'),
        'url' => env('APP_URL').'/storage',
        'visibility' => 'public',
    ],
    
    // For production, use S3
    's3' => [
        'driver' => 's3',
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION'),
        'bucket' => env('AWS_BUCKET'),
        'url' => env('AWS_URL'),
    ],
],
```

## 🔐 Security Considerations

1. **Input Validation**: All API endpoints include comprehensive validation
2. **Authentication**: Laravel Sanctum token-based authentication
3. **Authorization**: Role-based access control middleware
4. **File Upload Security**: Validate file types and sizes
5. **SQL Injection Prevention**: Eloquent ORM with parameter binding
6. **XSS Protection**: Proper output escaping in frontend

## 📱 Mobile Responsiveness

- Mobile-first design approach
- Collapsible sidebar navigation
- Touch-friendly interface elements
- Responsive tables with horizontal scroll
- Optimized chart displays for small screens

## 🎯 Production Deployment

1. **Build the frontend**:
   ```bash
   npm run build
   ```

2. **Copy dist files** to Laravel's `public` directory

3. **Configure Laravel routes** to serve the SPA:
   ```php
   Route::get('/{any}', function () {
       return view('app');
   })->where('any', '.*');
   ```

4. **Set up proper HTTP headers** for security:
   ```php
   // In web.php or middleware
   header('X-Frame-Options: DENY');
   header('X-Content-Type-Options: nosniff');
   header('X-XSS-Protection: 1; mode=block');
   ```

## 📞 Support & Documentation

For implementation support:
- Review the component documentation in `/src/components/admin/`
- Check API response formats in the mock data files
- Test with the provided sample database schemas
- Follow Laravel best practices for backend implementation

## 🎨 Customization

The design system is fully customizable through:
- `src/index.css` - Color tokens and design variables
- `tailwind.config.ts` - Extended Tailwind configuration
- Component variants - Modify shadcn/ui components as needed

---

**Built with modern web technologies for professional hotel management.**