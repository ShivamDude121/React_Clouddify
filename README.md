# React Cloudify

🚀 **React Cloudify** is a free and open-source React hosting platform that simplifies deployment and delivery of React-based applications. It consists of a microservices architecture to handle upload, deployment, and global delivery—all with Next.js on the front end.

---

## 🧩 Features

- Free hosting for React apps
- Simple deployment pipeline
- Scalable architecture with AWS S3 and Redis
- Built using modern technologies: **Next.js**, **Redis**, **S3**, **Node.js**,**Express**

---

## 🛠️ Architecture Overview

React Cloudify is made of **4 core services**:

### 1. 🌐 Frontend (Next.js)

- A user-friendly dashboard built with **Next.js**
- Allows users to input GitHub URLs or zipped project files
- Initiates the upload process

---

### 2. 📤 Upload Service

- Fetches the React project from a given **URL**
- Saves it temporarily on the server
- Pushes the source code to **AWS S3**
- Stores an instance reference in **Redis** for deployment tracking

---

### 3. 🚀 Deploy Service

- Listens for new entries in Redis
- Clones the source code from **S3** to a build server
- Builds the React project using `npm run build` or `yarn build`
- Pushes the production build to **S3** for global access

---

### 4. 🌍 Request Service

- Acts as a public CDN-like server
- Serves built React projects directly from **S3**
- Ensures fast delivery of static assets to end users worldwide

---

## 🧪 Tech Stack

- **Frontend**: Next.js
- **Backend Services**: Node.js, Express
- **Storage**: AWS S3
- **Cache/Queue**: Redis
- **Build Tools**: Webpack, Vite, or Create React App-based builds

---

## 📦 Installation (coming soon)

git clone of it 

 ``` git clone https://github.com/ShivamDude121/React_Clouddify.git ```

 change directory of it
 
 ``` cd React_Clouddify ```

 use docker compose up of it

 
 ``` docker compose up  -d```

## 🤝 Contributing

We welcome contributions from the community! To contribute to React Cloudify, follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/fooBar).

Make your changes and commit them (git commit -am 'Add some fooBar').

Push to the branch (git push origin -u feature/fooBar).

Create a new Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT License. Use it freely, modify it, and make it your own.

---

## ✨ Demo & Screenshots

Coming soon...

---

## 📬 Contact

Have questions or suggestions? Open an issue or reach out!
