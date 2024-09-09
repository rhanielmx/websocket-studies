import fastify from  "fastify"
import websocket from "@fastify/websocket"
import cors from "@fastify/cors"
import { websocketRoutes } from "./routes/websocketRoutes"
import { randomUUID } from "node:crypto"

const app = fastify()

app.register(websocket)

app.register(cors, {
  origin: '*'
})

app.register(websocketRoutes)

app.listen({ port: 3333 }, (err) => {
  if(err) {
    console.log(err)
  }

  console.log('Servidor rodando em http://localhost:3333')
})