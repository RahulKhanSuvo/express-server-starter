import app from "./app"

const bootstrap = () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`server is running on the ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
bootstrap()