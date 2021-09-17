import * as bodyParser from "body-parser";
import * as Express from "express";
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import pool from "../../../pool";

const signup = Express();
signup.use(bodyParser.json());
signup.use(Express.json())
signup.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
@ObjectType()
class Response{
@Field(() => String, {nullable: false})
msg:string;

}
 @Resolver()
 export class RegisterReslover {
  @Query(() => String) 
  async hello(){
    return await "Hello Wrold"
  }
  @Mutation(() => Response)
  async register(@Arg("username") username: String, @Arg("password") password: String, @Arg("email") email: String, @Arg("fullname") fullname: String, @Arg("age") age: String){
  const shouldSave = await pool.query("SELECT * FROM allusers WHERE username = $1", [username])
  if(shouldSave.rows[0] === undefined){
  const data = {
  msg : "Your account has been created.",
  }
//   CREATE TABLE allusers (
//     user_id SERIAL PRIMARY KEY,
//     username VARCHAR(50),
//     userpassword VARCHAR(500),
//     email VARCHAR(225),
//     age INTEGER,
//     fullname VARCHAR(80)

    
// );
  const description = "this user dont have a bio yet"
  const pfp = "https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
  const ismod = false
  const CLive = ""
  const numoflikes = 0 
  //https://i.pinimg.com/564x/65/25/a0/6525a08f1
  await pool.query("INSERT INTO allusers VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [username, password, email, age, fullname, description, pfp ,numoflikes, CLive,  ismod]);
  return await data
  }
  else{
    const data = {
      msg : "username is alerdy taken.",
      }
      return await data
  }

  }
  
 }
    
   
 

