import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import pool from "../../../pool"

@ObjectType()
class LoginResponse{
@Field(() => String, {nullable: false})
msg: string;
}

@Resolver()
export class LoginReslover{
    @Mutation(() => LoginResponse)
    async login(@Arg("username") username: string, @Arg("pass") pass: string){
     const logindata = await pool.query("SELECT * FROM allusers WHERE username = $1 AND userpassword = $2", [username, pass])
    if(logindata.rows[0] === undefined){
           const data = {
               msg: "Invalid username or password"
           }
           return data;
    }
    else if (logindata.rows[0] !== undefined){ 
     const data = {
        msg: "Correct information provided"
     }
     return data;

    }
    else{ 
        const data = {
            msg: "Ne radi"


        }
        return await data
    }

    



    }
    
}
