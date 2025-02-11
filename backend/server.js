//setting up prisma client and express server
import app from './src/app.js'
import express from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
});