import { serial, pgTable, varchar, integer, timestamp, pgEnum,boolean } from "drizzle-orm/pg-core";
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
  distributorLoginId:varchar("distributor_login_id"),
  distributorLoginPassword:varchar("distributor_login_password"),
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
  fromUserId: integer('from_user_id').references(()=>distributors.id),
  toUserId: integer('to_user_id').references(()=>users.id),
  xpAmount: integer('xp_amount').notNull(),
  transactionType: varchar('transaction_type').default("transfer"),
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

export const marketplaceItems:any = pgTable('marketplace_items', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description'),
  distributorId: integer('distributor_id').references(() => distributors.id),
  xpPrice: integer('xp_price').notNull(),
  isReedemed:boolean("is_redeemed").default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const distributors = pgTable('distributors', {
  id: serial('id').primaryKey(),
  adminId: integer('admin_id').references(() => admins.id),
  userName:varchar("user_name"),
  phoneNumber:integer("phone_number"),
  role: varchar('role').default('distributor'),
  organizationName: varchar('organization_name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  xpBalance: integer('xp_balance').default(10000)
});

// Define relations

export const adminRelations=relations(admins,({many})=>({
  users:many(users),
  distributors:many(distributors)
}))

export const usersRelations = relations(users, ({ many,one }) => ({
  xpTransactionsSent: many(xpTransactions, { relationName: 'fromUser' }),
  xpTransactionsReceived: many(xpTransactions, { relationName: 'toUser' }),
  achievements: many(achievements),
  marketplaceItems: many(marketplaceItems),
  distributor: many(distributors),
  admins: one(admins, {
    fields: [users.adminId
    ],
    references: [admins.id],
  }),
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
  distributor: one(distributors, {
    fields: [marketplaceItems.distributorId],
    references: [distributors.id],
  }),
  users: one(users, {
    fields: [marketplaceItems.userId],
    references: [users.id],
  }),
}));

export const distributorsRelations = relations(distributors, ({ one,many }) => ({
  admins: one(admins, {
    fields: [distributors.adminId],
    references: [admins.id],
  }),
}));