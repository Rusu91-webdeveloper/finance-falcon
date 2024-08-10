# 📂 Finance Falcon - Client

Welcome to the **Finance Falcon** frontend! This folder contains the React-based user interface for the Finance Falcon app. The frontend is designed to be responsive and user-friendly, allowing users to manage their finances with ease.

## 📝 Overview

This is the frontend part of the Finance Falcon application. It is built using React and communicates with the backend via RESTful APIs. The user interface includes features such as:

- User authentication via Clerk
- Income and expense tracking
- A calendar view for daily balance tracking
- Interactive charts for visualizing financial data

## 🛠️ Setup Instructions

### 1. Install Dependencies

First, ensure you have all the required dependencies installed. From the `client` directory, run:

```bash
npm install
```
### 2. Environment Variables

To run the frontend on your own setup, you'll need to configure environment variables. We've provided an `.env.example` file in the `client` directory that outlines the necessary variables.

1. **Copy the `.env.example` file to `.env`:**

   ```bash
   cp .env.example .env
