# Todo App

A simple Todo List application built with Next.js, TypeScript, and MongoDB. Users can add, delete, complete tasks, and filter by All, Active, or Completed. Duplicate tasks are prevented.

## Features

- Add new tasks
- Delete tasks
- Mark tasks as completed
- Filter tasks: All / Active / Completed
- Prevent duplicate tasks
- Persistent data with MongoDB

## Technologies Used

- Next.js (App Router)
- TypeScript
- MongoDB & Mongoose
- Bootstrap 5
- Fetch API

## Folder Structure

app/
api/
todos/
route.ts 
page.tsx # Frontend
globals.css # Styling
lib/
mongodb.ts # MongoDB connection
models/
todo.ts # Mongoose model