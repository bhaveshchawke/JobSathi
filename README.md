# Betul Jobs Portal - Run Instructions (Hindi)

Is project ko run karne ke liye neeche diye gaye steps follow karein.

## Step 1: Backend Setup (Server)

1. Command Private prompt/Terminal open karein aur `server` folder me jaayein:
   ```bash
   cd server
   ```

2. Package.json create karein:
   ```bash
   npm init -y
   ```

3. Zaroori libraries install karein:
   ```bash
   npm install express mongoose dotenv cors multer multer-s3 @aws-sdk/client-s3 socket.io
   ```

4. `.env` file banayein:
   `server` folder ke andar ek nayi file banayein jiska naam `.env` ho aur usme ye likhein:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/betuljobs?retryWrites=true&w=majority
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_BUCKET_NAME=your_bucket_name
   AWS_REGION=ap-south-1
   ```
   *(Note: Apna MongoDB URI aur AWS details replace karein)*

5. Server Start karein:
   ```bash
   node index.js
   ```
   Output aana chahiye: `Server running on port 5000`

## Step 2: Frontend Setup (Client)

1. Naya terminal open karein aur `client` folder me jaayein:
   ```bash
   cd client
   ```

2. React Vite Project setup karein (Agar empty hai to):
   ```bash
   npm create vite@latest . -- --template react
   npm install
   ```

3. Zaroori libraries install karein:
   ```bash
   npm install axios react-router-dom socket.io-client
   ```
   *(Agar Tailwind CSS configured nahi hai to uske liye: `npm install -D tailwindcss postcss autoprefixer` aur `npx tailwindcss init -p` run karein)*

4. Frontend Start karein:
   ```bash
   npm run dev
   ```
   Apko ek link milega (jaise `http://localhost:5173`), use browser me open karein.

## Summary
- **Backend:** `node index.js` (Port 5000)
- **Frontend:** `npm run dev` (Port 5173)
