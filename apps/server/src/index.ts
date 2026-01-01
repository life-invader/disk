import { startApp } from './app/app.js'
import { env } from "./config/env.js"

startApp()

console.log(env.PORT)