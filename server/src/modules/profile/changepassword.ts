import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import pool from "../../../pool";
@ObjectType()
export class ChangePasswordResponse{

@Field(() => Boolean)
   passwordisgood: boolean;
@Field(() => String, {nullable: true})
error: string; 
}

@Resolver()
export class ChangePasswordReslover{

    @Mutation(() => ChangePasswordResponse)
    async updatepassword(@Arg("username") username: string, @Arg("newpassword") newpassword: string, @Arg("currpass") currpass: string){
         const checkcurrpass = await pool.query("SELECT * FROM allusers WHERE userpassword = $1", [currpass]);
          if(checkcurrpass.rows[0] !== undefined) { 
         await pool.query("UPDATE allusers SET userpassword = $1 WHERE username = $2", [newpassword, username])
          const data = {
               passwordisgood: true,
               error: null      
            }
           return data
          }
          else{
          const data = {
              passwordisgood: false,
              error: "Wrong password"
              
          }
          return await data
          }
    }

}