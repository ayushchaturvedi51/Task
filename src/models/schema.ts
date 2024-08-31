import { serial,pgTable,varchar, integer,primaryKey,jsonb ,timestamp,} from "drizzle-orm/pg-core";
import { like, relations } from "drizzle-orm";


//------------------------------SCHEMAS------------------------------------------------



export const users=pgTable("users",{
  id: serial("id"),
  userId:varchar("user_id").default(null),
  name: varchar("name"),
  email:varchar("email").unique(),
  age:integer("age"),   
  gender:varchar("gender"),
  countryCode:varchar("country_code"),
  phoneNumber:varchar("phone_number",{length:10}).unique(),
  password:varchar("password"),
  createdAt:timestamp("created_at").defaultNow()
},(table)=>({
  pk: primaryKey({ columns:[table.id] }),
})
)






//----------------------------------------- RELATIONS -------------------------------------------------



// export const usersRelations = relations(users, ({ one, many }) => ({
//   auction: many(auction),
//   admin:one(admin, {
//     relationName: 'AdminUsers',
//     fields: [users.adminId],
//     references: [admin.id],
//   }),
// }));






//---------------------------------------------------------------------------------------

