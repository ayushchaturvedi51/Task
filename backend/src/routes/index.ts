import express from "express"
import auth from "./auth"
import admin from './admin'
import achievements from  './achievements';
import market from './market'
const router=express.Router()

const defaultRoutes = [
  {
    path: "/auth",
    route: auth,
  },
  {
    path:"/admin",
    route:admin
  },
  {
    path: "/achievements",
    route: achievements
  },
  {
    path: "/market",
    route: market
  }
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.get("/", async (req, res) => {
  return res.send("Server is running");
});


export default router;