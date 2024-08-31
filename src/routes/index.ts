import express from "express"
import auth from "./auth"
import admin from './admin'

const router=express.Router()

const defaultRoutes = [
  {
    path: "/auth",
    route: auth,
  },
  {
    path:"/admin",
    route:admin
  }
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.get("/", async (req, res) => {
  return res.send("Server is running");
});


export default router;