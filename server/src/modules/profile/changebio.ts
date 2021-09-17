import { Arg, Field, Mutation, ObjectType,  Resolver } from "type-graphql";
import pool from "../../../pool";

@ObjectType()
class ChangeBioResponse{
    @Field(() => Boolean, {nullable: false})
    issucess: boolean
}

@Resolver()
export class ChangeBioReslover{
 @Mutation(() => ChangeBioResponse)
 async update(@Arg("username") username: String, @Arg("newbio") newbio: String){
     await pool.query("UPDATE allusers SET description = $1 WHERE username = $2", [newbio, username])
    const data = {
        issucess: true
    }
    return await data

 }   
}
