import express from "express"
import auth from "./auth"
import user from './admin'
import distributor from './distributor'

const router=express.Router()

const defaultRoutes = [
  {
    path: "/auth",
    route: auth,
  },
  {
    path:"/user",
    route:user
  },
  {
    path:"/distributor",
    route:distributor
  }
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.get("/", async (req, res) => {
  return res.send("Server is running");
});


export default router;