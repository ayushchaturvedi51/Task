<<<<<<< HEAD
import { serial, pgTable, varchar, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
=======
import { serial, pgTable, varchar, integer, timestamp, pgEnum,boolean } from "drizzle-orm/pg-core";
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca
import { relations } from "drizzle-orm";

// Define enums
const transactionTypeEnum = pgEnum('transaction_type', ['earn', 'purchase', 'transfer', 'redeem']);

// Define tables

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role').default('admin'),
  xpBalance: integer('xp_balance').default(100000),
<<<<<<< HEAD
=======
  distributorLoginId:varchar("distributor_login_id"),
  distributorLoginPassword:varchar("distributor_login_password"),
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  adminId:integer('admin_id').references(()=>admins.id),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role').default('user'),
  xpBalance: integer('xp_balance').default(10),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const xpTransactions = pgTable('xp_transactions', {
  id: serial('id').primaryKey(),
<<<<<<< HEAD
  fromUserId: integer('from_user_id').references(() => users.id),
  toUserId: integer('to_user_id').references(() => users.id),
  xpAmount: integer('xp_amount').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
=======
  fromUserId: integer('from_user_id').references(()=>distributors.id),
  toUserId: integer('to_user_id').references(()=>users.id),
  xpAmount: integer('xp_amount').notNull(),
  transactionType: varchar('transaction_type').default("transfer"),
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description'),
  userId: integer('user_id').references(() => users.id),
  xpAwarded: integer('xp_awarded'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

<<<<<<< HEAD
export const marketplaceItems = pgTable('marketplace_items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description'),
  distributorId: integer('distributor_id').references(() => users.id),
  xpPrice: integer('xp_price').notNull(),
=======
export const marketplaceItems:any = pgTable('marketplace_items', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description'),
  distributorId: integer('distributor_id').references(() => distributors.id),
  xpPrice: integer('xp_price').notNull(),
  isReedemed:boolean("is_redeemed").default(false),
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const distributors = pgTable('distributors', {
  id: serial('id').primaryKey(),
  adminId: integer('admin_id').references(() => admins.id),
  userName:varchar("user_name"),
<<<<<<< HEAD
  organizationName: varchar('organization_name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
=======
  phoneNumber:integer("phone_number"),
  role: varchar('role').default('distributor'),
  organizationName: varchar('organization_name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  xpBalance: integer('xp_balance').default(10000)
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca
});

// Define relations

export const adminRelations=relations(admins,({many})=>({
  users:many(users),
  distributors:many(distributors)
}))

<<<<<<< HEAD
export const usersRelations = relations(users, ({ many }) => ({
=======
export const usersRelations = relations(users, ({ many,one }) => ({
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca
  xpTransactionsSent: many(xpTransactions, { relationName: 'fromUser' }),
  xpTransactionsReceived: many(xpTransactions, { relationName: 'toUser' }),
  achievements: many(achievements),
  marketplaceItems: many(marketplaceItems),
<<<<<<< HEAD
  distributor: many(distributors),
=======
  admins: one(admins, {
    fields: [users.adminId
    ],
    references: [admins.id],
  }),
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca
}));

export const xpTransactionsRelations = relations(xpTransactions, ({ one }) => ({
  fromUser: one(users, {
    fields: [xpTransactions.fromUserId],
    references: [users.id],
    relationName: 'fromUser',
  }),
  toUser: one(users, {
    fields: [xpTransactions.toUserId],
    references: [users.id],
    relationName: 'toUser',
  }),
}));

export const achievementsRelations = relations(achievements, ({ one }) => ({
  user: one(users, {
    fields: [achievements.userId],
    references: [users.id],
  }),
}));

export const marketplaceItemsRelations = relations(marketplaceItems, ({ one }) => ({
<<<<<<< HEAD
  distributor: one(users, {
    fields: [marketplaceItems.distributorId],
=======
  distributor: one(distributors, {
    fields: [marketplaceItems.distributorId],
    references: [distributors.id],
  }),
  users: one(users, {
    fields: [marketplaceItems.userId],
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca
    references: [users.id],
  }),
}));

<<<<<<< HEAD
export const distributorsRelations = relations(distributors, ({ one }) => ({
  user: one(users, {
    fields: [distributors.adminId],
    references: [users.id],
=======
export const distributorsRelations = relations(distributors, ({ one,many }) => ({
  admins: one(admins, {
    fields: [distributors.adminId],
    references: [admins.id],
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca
  }),
}));