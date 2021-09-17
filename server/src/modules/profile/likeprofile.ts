import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import pool from "../../../pool";

@ObjectType()

class LikeProfileRespone{

@Field(() => Number, {nullable: false})
numoflikes: number
@Field(() => Boolean, {nullable: false})
thisuserliked: boolean

@Field(() => String, {nullable: true})
error: any
}

@Resolver()
export class LikeProfileReslover {

@Mutation(() => LikeProfileRespone)
async like(@Arg("username") username: String, @Arg("numoflikes" ) numoflikes: Number,  @Arg("alerdyliked") alerdyliked: boolean){
const data = await pool.query("SELECT * FROM allusers WHERE username = $1")
}
    
}