import postgresdb from "../../config/db";
import { users, achievements } from "../../models/schema";
import { eq,and } from "drizzle-orm";

export class achievementsController {

    static getAllAchievements = async (userId:number): Promise<any> => {
        try {
            const achievements = await postgresdb.query.users.findMany({
                where: eq(users.id, userId),
                columns: {},
                with: {
                    achievements: {
                        columns: {
                            xpAwarded: true,
                        }
                    }
                }
            });
            return achievements;
        } catch (err) {
            throw new Error('Failed to retrieve achievements: ' + err.message);
        }
    }

    static getachievement = async (userId:number,achievementId: number): Promise<any> => {
        try {
            const achievement = await postgresdb.query.achievements.findFirst({
                where: and(eq(achievements.id, achievementId),eq(achievements.userId,userId)),
                columns: {
                    id: true,
                    userId:true,
                    distributorId:true,
                    xpAwarded: true,
                }
            });
            return achievement;
        } catch (err) {
            throw new Error('Failed to retrieve achievement: ' + err.message);
        }
    }

    
}
