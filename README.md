# Welcome to your Expo app 👋
![Screenshot](http://github.com/afidhu/Native_DALALIAPP/raw/main/Screenshot%20from%202025-05-10%2000-38-16.png)          ggergbtaqyyse

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.



# 🏠 House Rental Platform

A mobile application built with **React Native (Expo SDK 53)** and powered by **Supabase** for backend services. This platform connects **house agents**, **renters**, and an **admin** through a seamless and secure rental ecosystem.

---

## 📱 Platform Overview

This system streamlines the process of renting and managing houses. It includes role-based access control and ensures that only verified agents can list properties.

---

## 👥 User Roles

### 🧑‍💼 Admin
- Approves or rejects **agent registrations**
- Manages platform content and user permissions

### 🧑‍💼 Agent
- Registers and submits a **business account** for verification
- Can **post house listings** only **after approval**
- Manages their own listed properties

### 🧑‍💻 Renter
- Browses listed houses
- Can **rent** available properties
- Views agent profiles and contact details

---

## ⚙️ Technologies Used

| Tech Stack        | Details |
|------------------|---------|
| **Frontend**     | React Native (Expo SDK 53) |
| **Backend**      | Supabase (PostgreSQL, Auth, Storage) |
| **Authentication** | Supabase Auth (Email/Password) |
| **State Mgmt**   | React Context API |
| **Navigation**   | `expo-router` |

---

## 🔐 Key Features

- 📄 **Agent Approval Workflow**
  - Agents must be approved by admin before accessing posting features

- 🏠 **Property Listings**
  - Agents can post images, descriptions, and prices for rental properties

- 🔍 **House Browsing**
  - Renters can explore listings with filtering and view agent details

- 📦 **Supabase Storage**
  - Secure video and image uploads for house media

- 📲 **Mobile-First UX**
  - Designed with mobile usability and responsiveness in mind

---

## ✅ App Flow Summary

1. **Agent registers** and submits business information
2. **Admin reviews** and approves the agent
3. Approved **agent posts houses**
4. **Renter browses** houses and selects listings to rent

---

## 🚧 Current Status

- ✅ Agent approval system complete  
- ✅ House posting and image upload functional  
- ✅ Role-based routing implemented  
- 🔄 Renter rental flow in progress  
- 🛠️ Testing and UI polish ongoing

---

## 📂 Project Structure
dalaliApp$/
         app 
         assets    
         componets 
         eslint.config.js 
         metro.config.js 
         package.json 
         README.md       
         tsconfig.json
         app.json 
         command.txt  eas.json 
         expo-env.d.ts    
         node_modules  
         package-lock.json 
         Supabaseonf.tsx
      




## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
