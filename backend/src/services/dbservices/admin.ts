import postgresdb from "../../config/db";
import { setUser } from "../../config/jwttoken";
import { achievements, distributors, users, xpTransactions } from "../../models/schema";
import { eq, and, sql } from "drizzle-orm";

export class User {
  static generateId = () =>
    Math.random().toString(36).substr(2, 8).toUpperCase();
  static register = async (data: any): Promise<any> => {
    try {
      const registerUser = await postgresdb
        .insert(users)
        .values({
          userId: this.generateId(),
          name: data.name,
          age: data.age,
          gender: data.gender,
          email: data.email,
          countryCode: data.countryCode,
          phoneNumber: data.phoneNumber,
          password: data.password,
        })
        .returning({ userId: users.id });
      const token = setUser({ userId: registerUser[0].userId });
      return token;
    } catch (error) {
      throw new Error(error);
    }
  };

  static login = async (details: any): Promise<any> => {
    try {
      const getUser = await postgresdb.query.users.findFirst({
        where: eq(users.email, details.email),
        columns: {
          id: true,
          password: true,
          email: true,
          phoneNumber: true,
        },
      });
      if (!getUser) throw new Error("Insert Correct email");
      const checkPassword = await postgresdb
        .select({ password: users.password })
        .from(users)
        .where(
          and(
            eq(users.password, getUser.password),
            eq(users.phoneNumber, getUser.phoneNumber)
          )
        );
      if (!checkPassword) throw new Error("Invalid Password");

      const token = setUser({ userId: getUser.id });
      return token;
    } catch (error) {
      throw new Error(error);
    }
  };

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
  static async updateAchievements(userId:number,achievementName:string, xpAwarded:number){
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
