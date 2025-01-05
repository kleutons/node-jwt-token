import express from "express"
import router from "./routes/routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (rep, res)=>{
    res.json({
        message: "Server Started!"
    })
});

//Routes
app.use(router);

app.listen(port, ()=>{
    console.log("🔥 Server Starting on port http://localhost:"+port);
})