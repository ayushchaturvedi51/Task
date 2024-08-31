import postgresdb from "../../config/db";
import { setUser } from "../../config/jwttoken";
import { achievements, distributors, users, xpTransactions } from "../../models/schema";
import { eq, and, sql } from "drizzle-orm";

export class Admin {
  
  static  updateXp=async(fromUserId:number,toUserId:number,xpAmount:any):Promise<any>=>{
    try {
      await postgresdb.transaction(async (tx) => {

        // await tx.select({distributors.xpBalance}).from(distributors).where
        await tx.update(distributors).set({
          // @ts-ignore
          xpBalance: sql`${distributors.xpBalance}-${xpAmount}`
        }).where(eq(distributors.id,fromUserId))

        await tx.update(users).set({
          xpBalance: sql`${users.xpBalance}+${xpAmount}`
        }).where(eq(users.id,toUserId))

      })
      
    } catch (error) {
      throw new Error(error)
    }
  }

  static async updateUserEp(userId: number, xp: number) {
    try {
      const user = await postgresdb
        .select({ id: users.id, xpBalance: users.xpBalance })
        .from(users)
        .where(eq(users.id, userId));
      if (user) {
        await postgresdb
          .update(users)
          .set({ xpBalance: user[0].xpBalance + xp })
          .where(eq(users.id, userId));
        return user;
      }
      throw new Error("User not found");
    } catch (error) {
      throw new Error("Invalid User");
    }
  }

  static async updateDistrubutorXpPoints(distributorId: number, xp: number) {
    try {
      const distrubutor = await postgresdb
        .select()
        .from(distributors)
        .where(eq(distributors.id, distributorId));
      if (distrubutor) {
        await postgresdb
          .update(distributors)
          // @ts-ignore
          .set({ xpBalance: sql`${distributors.xpBalance}+${xp}` })
          .where(eq(distributors.id, distributorId));
        return distrubutor;
      }
      return null;
    } catch (error) {
      throw new Error("Invalid Distributor");
    }
  }

  static async updateAdminPoints(xp: Number) {
    try {
      const admin = await postgresdb
        .select({ id: users.id, xpBalance: users.xpBalance })
        .from(users)
        .where(eq(users.role, "admin"));
      if (admin) {
        await postgresdb
          .update(users)
          .set({ xpBalance: sql`${users.xpBalance}+${xp}` })
          .where(eq(users.role, "admin"));

        return admin;
      }
      return null;
    } catch (error) {
      throw new Error("Invalid Admin");
    }
  }

  static async createTransaction(
    xpAmount: any,
    transactionType: any,
    fromUserId: number,
    toUserId: number
  ) {
    try {
      const transaction = await postgresdb.insert(xpTransactions).values({
        xpAmount: xpAmount,
        transactionType: transactionType,
        fromUserId: fromUserId,
        toUserId: toUserId,
      });

      return transaction;
    } catch (error) {
      throw new Error("Error Creating Transaction");
    }
  }

  static async getTransactions() {
    try {
      const transactions = await postgresdb.select().from(xpTransactions);
      return transactions;
    } catch (error) {
      throw new Error("Error while getting transactions");
    }
  }
  // name: varchar('name', { length: 100 }).notNull(),
  // description: varchar('description'),
  // userId: integer('user_id').references(() => users.id),
  // xpAwarded: integer('xp_awarded'),
  static async insertAchievements(userId:number,achievementName:string, xpAwarded:number){
    try {
      const achievement = await postgresdb.insert(achievements).values({
        userId:userId,
        name:achievementName,
        xpAwarded: xpAwarded
      })
      return achievement;
    } catch (error) {
      throw new Error("Error while creating the achievement")
    }
  }
}
