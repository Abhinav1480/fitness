# CultFit Clone - Full-Stack Fitness Tracker 🏋️‍♂️

A complete full-stack fitness tracking web application inspired by CultFit, with daily step tracking, food recommendations, and progress analytics.

## Features

### 🎯 Core Features
- **User Authentication** - Secure JWT-based login/signup
- **Daily Activity Logging** - Track steps, calories, sleep, and workouts
- **Smart Dashboard** - View today, weekly, and monthly statistics
- **Food Recommendations** - Personalized nutrition guide based on fitness goals
- **Progress Analytics** - Visual charts showing your fitness journey
- **Responsive Design** - Works perfectly on desktop and mobile

### 📊 Pages
1. **Home** - Welcome page with login/signup
2. **Dashboard** - Overview of your fitness stats
3. **Log Activity** - Form to track daily activities
4. **Nutrition** - Food recommendations with images and calories
5. **Analytics** - Weekly/monthly progress charts

## Tech Stack

### Frontend
- **React 18** (via CDN)
- **Tailwind CSS** (via CDN)
- **Recharts** - Beautiful charts for analytics
- **JWT Authentication** - Secure token-based auth

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB + Mongoose** - Database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication

## Project Structure

```
cultfit-clone/
├── models/
│   ├── User.js           # User model with auth
│   ├── DailyLog.js       # Activity logs model
│   └── Food.js           # Food recommendations model
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── log.js            # Activity logging routes
│   └── food.js           # Food recommendations routes
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── utils/
│   └── seedFood.js       # Default food data seeder
├── public/
│   └── index.html        # Complete React frontend
├── server.js             # Express server
├── package.json          # Dependencies
├── .env                  # Environment variables
└── README.md             # This file
```

## Installation

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Edit the `.env` file and update:
   ```env
   MONGO_URL=mongodb://localhost:27017/cultfit-clone
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=3000
   ```

3. **Make sure MongoDB is running**
   
   If using local MongoDB:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   mongod
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The application will be available at: **http://localhost:3000**

## Usage

### 1. Register/Login
- Create an account with email and password
- Choose your fitness goal (Lose Weight / Gain Muscle / Stay Fit)

### 2. Dashboard
- View your daily, weekly, and monthly step counts
- See calories burned based on steps
- Track progress towards your daily 10,000 step goal

### 3. Log Activity
- Record your daily steps
- Log calories consumed
- Track sleep hours
- Note your workout type

### 4. Nutrition Guide
- View recommended foods based on your goal
- See calories and protein content
- Beautiful food images for motivation

### 5. Progress Analytics
- Weekly step progress line chart
- Weekly calorie intake bar chart
- Visual representation of your fitness journey

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login existing user

### Activity Logging
- `POST /api/log` - Create/update daily log
- `GET /api/log` - Get user's logs (with period filter)
- `GET /api/log?period=today` - Today's log
- `GET /api/log?period=week` - Last 7 days
- `GET /api/log?period=month` - Last 30 days

### Food Recommendations
- `GET /api/food/:goalType` - Get food recommendations
- Example: `/api/food/Lose%20Weight`

## Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  goal: String (Lose Weight | Gain Muscle | Stay Fit),
  createdAt: Date
}
```

### DailyLog
```javascript
{
  userId: ObjectId,
  date: Date,
  steps: Number,
  calories: Number,
  sleep: Number,
  workout: String,
  createdAt: Date
}
```

### Food
```javascript
{
  goalType: String,
  name: String,
  calories: Number,
  protein: Number,
  imageURL: String
}
```

## Default Food Data

The app comes with pre-seeded food recommendations:
- **Lose Weight**: 6 low-calorie, high-protein foods
- **Gain Muscle**: 6 high-protein, muscle-building foods
- **Stay Fit**: 6 balanced, healthy meal options

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGO_URL` | ✅ Yes | `mongodb://localhost:27017/cultfit-clone` | MongoDB connection string |
| `JWT_SECRET` | ✅ Yes | - | Secret key for JWT tokens |
| `PORT` | ⚠️ Optional | `3000` | Server port number |

## Features Breakdown

### Dashboard Statistics
- **Today**: Current day's steps and calories burned
- **This Week**: Total steps from last 7 days
- **This Month**: Total steps from last 30 days
- **Progress Bar**: Visual progress towards daily 10,000 step goal

### Activity Logging
- Steps counter
- Calorie intake tracker
- Sleep duration logger
- Workout type selector (Cardio, Strength, Yoga, HIIT, Sports)

### Food Recommendations
- Goal-based food suggestions
- Calorie information
- Protein content
- Food images from Unsplash

### Analytics Charts
- **Line Chart**: Weekly step progress over time
- **Bar Chart**: Weekly calorie intake comparison
- Interactive tooltips
- Responsive design

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Token expiration (7 days)
- Secure authentication middleware

## Deployment

### Deploy to Qoder
1. Upload project folder to Qoder
2. Set environment variables in Qoder settings
3. Run `npm install`
4. Start with `npm start`

### Deploy to Other Platforms
- **Vercel** - Full-stack deployment
- **Heroku** - Add MongoDB add-on
- **Railway** - Connect MongoDB database
- **Render** - Deploy with PostgreSQL or MongoDB

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGO_URL` in `.env`
- For MongoDB Atlas, whitelist your IP

### JWT Authentication Error
- Verify `JWT_SECRET` is set in `.env`
- Clear browser localStorage if issues persist
- Check token in Network tab (DevTools)

### Food Data Not Loading
- Server automatically seeds data on first run
- Check MongoDB connection
- Verify Food collection exists

## License

MIT License - Feel free to use for personal or commercial projects

## Support

For issues or questions:
1. Check environment variables are set
2. Ensure MongoDB is running
3. Verify all dependencies are installed
4. Check browser console for errors

---

**Built with ❤️ in Qoder**  
*Transform Your Body. Elevate Your Life.*
