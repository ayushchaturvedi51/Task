import express from "express"
import auth from "./auth"
<<<<<<< HEAD
import user from './admin'
import distributor from './distributor'
=======
import admin from './admin'
import distributor from './distributor'
import market from './market'
import achievement from './achievements'
import xp from './xpRoutes'
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca

const router=express.Router()

const defaultRoutes = [
  {
    path: "/auth",
    route: auth,
  },
  {
<<<<<<< HEAD
    path:"/user",
    route:user
=======
    path:"/admin",
    route:admin
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca
  },
  {
    path:"/distributor",
    route:distributor
<<<<<<< HEAD
=======
  },{
    path:"/market",
    route:market
  }
  ,{
    path:"/achievement",
    route:achievement
  },
  {
    path:'/xp',
    route:xp
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca
  }
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.get("/", async (req, res) => {
  return res.send("Server is running");
});


export default router;