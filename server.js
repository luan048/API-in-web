import express from 'express'
import { prismaClient } from './database.js'

const server = express()
server.use(express.json())

const port = process.env.PORT ?? 4000

server.get('/', async (req, res) => {
    try {
        const carts = await prismaClient.cart.findMany()
        return res.json(carts)
    }

    catch(ex) {
        console.log(ex)
    }
})

server.post('/create', async (req, res) => {
    const {marca, modelo} = req.body
    const cart = await prismaClient.cart.create({
        data: {
            marca,
            modelo,
        },
    })
    return res.json(cart)
})

server.listen(port, () => console.log(`Server is runnit on port: ${port}`))