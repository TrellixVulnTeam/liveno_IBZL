import { Arg, Field, Mutation, ObjectType,  Resolver } from "type-graphql";
import pool from "../../../pool";

@ObjectType()
class ChangeFullNameResponse{
    @Field(() => Boolean, {nullable: false})
    issucess: boolean
}

@Resolver()
export class ChangeFullNameReslover{
 @Mutation(() => ChangeFullNameResponse)
 async updatefullname(@Arg("username") username: String, @Arg("newfullname") newfullname: String){
     await pool.query("UPDATE allusers SET fullname = $1 WHERE username = $2", [newfullname, username])
    const data = {
        issucess: true
    }
    return await data

 }   
}