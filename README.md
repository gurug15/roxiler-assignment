# MERN Stack Transaction Dashboard

A simple dashboard to visualize and analyze transaction data.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

## Setup Instructions

### 1. Database Setup

1. Create a free MongoDB database:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up/Login and create a free cluster
   - Create a database user
   - Get your connection string

### 2. Project Setup

1. Clone the repository:
```bash
git clone https://github.com/gurug15/roxiler-assignment.git
cd roxiler-assignment
```

2. Set up environment variables:
```bash
# In backend folder, create .env file
cd server
cp .env.example .env

# Add your MongoDB URL to .env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
API_URL="your_api_url"
```

### 3. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Seed Database

```bash
# In server folder
cd server
npm run seed
```

### 5. Run the Application

```bash
# Start server server (in server folder)
npm run dev

# Start client (in client folder)
cd ../client
npm run dev
```

The application should now be running at:
- client: http://localhost:5173
- server: http://localhost:5000

## API Routes

- `GET /api/transactions` - List transactions
- `GET /api/statistics` - Get monthly statistics
- `GET /api/bar-chart` - Get price range data
- `GET /api/pie-chart` - Get category distribution
- `GET /api/combined` - Get all stats combined