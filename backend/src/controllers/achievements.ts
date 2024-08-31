import { Request, Response } from "express";
import dbservices from "../services/dbservices";

export class achievementsController {
    
    static allachievements = async (req: Request, res: Response): Promise<any> => {
        try {
            const achievements = await dbservices.achievementsController.getAllAchievements();
            if (!achievements) {
                return res.status(404).send({ status: false, message: "No Achievements found" });
            }
            return res.status(200).send({ status: true, message: "All Achievements", data: achievements });
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message });
        }
    }

    static creteAchievement = async (req: Request, res: Response): Promise<any> => {
        try {
            
            const newAchievement = await dbservices.achievementsController.createAchievement(req.body, req["user"]["id"]);
            return res.status(201).send({ status: true, message: "Achievement Created", data: newAchievement });
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message });
        }
    }
    
    static specificAchievements = async (req: Request, res: Response): Promise<any> => {
        try {
            const achievementId = parseInt(req.params.id);
            const updateAchievement = await dbservices.achievementsController.getachievement(achievementId);
            return res.status(200).json({ status: true, message: "Data fetched", updateAchievement });
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message });
        }
    }
}
