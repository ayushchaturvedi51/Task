import postgresdb from "../../config/db";
import { users, achievements } from "../../models/schema";
import { eq } from "drizzle-orm";

export class achievementsController {

    static getAllAchievements = async (): Promise<any> => {
        try {
            const achievements = await postgresdb.query.users.findMany({
                where: (users, { eq }) => eq(users.role, 'user'),
                columns: {
                    id: true,
                },
                with: {
                    achievements: {
                        columns: {
                            name: true,
                            description: true,
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

    static getachievement = async (achievementId: number): Promise<any> => {
        try {
            const achievement = await postgresdb.query.achievements.findFirst({
                where: eq(achievements.id, achievementId),
                columns: {
                    id: true,
                    name: true,
                    description: true,
                    xpAwarded: true,
                }
            });
            return achievement;
        } catch (err) {
            throw new Error('Failed to retrieve achievement: ' + err.message);
        }
    }

    static createAchievement = async (details: any, userid: number): Promise<any> => {
        try {
            const existingAchievement = await postgresdb.query.achievements.findFirst({
                where: (achievements, { eq, and }) => and(
                    eq(achievements.name, details.name),
                    eq(achievements.userId, userid)
                ),
                columns: {
                    id: true,
                }
            });
    
            if (existingAchievement) {
                return {
                    status: false,
                    message: "Achievement with the same name already exists."
                };
            }
    
            const create = await postgresdb.insert(achievements).values({
                name: details.name,
                description: details.description || "",
                userId: userid,
                xpAwarded: details.xpAwarded,
            });
    
            return {
                status: true,
                message: "Achievement created successfully.",
                data: create
            };
        } catch (error) {
            throw new Error('Failed to create achievement: ' + error.message);
        }
    }    
}
