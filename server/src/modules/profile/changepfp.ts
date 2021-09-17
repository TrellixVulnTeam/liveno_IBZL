import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import pool from "../../../pool";
@ObjectType()
export class ChangePfpResponse{
   
@Field(() => Boolean)
   issucess: boolean; 
}

@Resolver()
export class ChangePfpReslover{
    
    @Mutation(() => ChangePfpResponse)
    async updatepfp(@Arg("username") username: string, @Arg("newpfp") newpfp: string): Promise<ChangePfpResponse> {
               try{
             await pool.query("UPDATE allusers SET pfp = $1 WHERE username = $2", [newpfp, username]).catch(err => console.log(err))
            const data = {
               issucess: true
            }
            return await data
        }
        catch (err) {
            console.log(err)
        }
       
        
        
    }

}
