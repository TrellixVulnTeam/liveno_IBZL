
import {Arg, Field, Mutation, ObjectType, Resolver} from "type-graphql"
import pool from "../../../pool"

@ObjectType()

class GetUserResponse{
@Field(() => String, {nullable: true})
username: String

@Field(() => String, {nullable: true})
fullname: String

@Field(() => String, {nullable: true})
password: String

@Field(() => String, {nullable: true})
pfp: String

@Field(() => Boolean, {nullable: true})
ismod: Boolean

@Field(() => String, {nullable: true})
description: String

@Field(() => Number, {nullable: true})
age: Number

@Field(() => String, {nullable: true})
email: String

@Field(() => String, {nullable: true})
CurrentLive: String
@Field (() => String, {nullable: true})
numoflikes: Number
}

@ObjectType()

class NullResponse{
@Field(() => String, {nullable: true})
msg: String

}

@Resolver()
export class GetUserReslover{
    
    @Mutation(() => GetUserResponse || NullResponse || null || undefined)
    async getUser(@Arg("username") username: String){
    try{
    
      const password  = await (await pool.query("SELECT userpassword FROM allusers WHERE username = $1", [username])).rows[0].userpassword
      const Foundusername  = await (await pool.query("SELECT username FROM allusers WHERE username = $1", [username])).rows[0].username
      const age  = await (await pool.query("SELECT age FROM allusers WHERE username = $1", [username])).rows[0].age
      const email  = await (await pool.query("SELECT email FROM allusers WHERE username = $1", [username])).rows[0].email
      const description  = await (await pool.query("SELECT description FROM allusers WHERE username = $1", [username])).rows[0].description
      const currentlive  = await (await pool.query("SELECT CurrentLive FROM allusers WHERE username = $1", [username])).rows[0].currentlive
      const pfp  = await (await pool.query("SELECT pfp FROM allusers WHERE username = $1", [username])).rows[0].pfp
     const ismod  = await (await pool.query("SELECT ismod FROM allusers WHERE username = $1", [username])).rows[0].ismod 
     const fullname  = await (await pool.query("SELECT fullname FROM allusers WHERE username = $1", [username])).rows[0].fullname
     const numoflikes  = await (await pool.query("SELECT numoflikes FROM allusers WHERE username = $1", [username])).rows[0].numoflikes
     const data = {
      username: JSON.stringify(Foundusername),
      password: JSON.stringify(password),
      description: JSON.stringify(description),
      pfp: JSON.stringify(pfp),
      email: JSON.stringify(email),
      CurrentLive: JSON.stringify(currentlive),
      age: age,
      ismod: ismod,
      fullname: JSON.stringify(fullname),
      numoflikes: JSON.stringify(numoflikes),
  }
  if(data.age === undefined || data.description === undefined || data.pfp === undefined || data.email === undefined || data.CurrentLive === undefined || data.username === undefined || data.ismod === undefined || data.numoflikes === undefined){
      const data = {
         username: "",
         password: "",
         description: "",
         pfp: "",
         email: "",
         CurrentLive: "",
         age: "",
         ismod: "",
         fullname: "",
         numoflikes: ""
      }
      return data
  }
   else{
     return await data
   }
     
 
 
 }
 catch{
  return await "Invalid username"
 }
    }     
     
  
     
     
}