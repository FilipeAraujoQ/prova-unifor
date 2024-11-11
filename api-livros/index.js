import express from "express"
import livroRoutes from "./routes/livros.js"
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors())

app.use("/", livroRoutes)

app.listen(8800)