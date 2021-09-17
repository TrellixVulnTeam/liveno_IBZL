import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ChangeBioReslover } from "./src/modules/profile/changebio";
import { ChangeFullNameReslover } from "./src/modules/profile/changefullname";
import { ChangePasswordReslover } from "./src/modules/profile/changepassword";
import { ChangePfpReslover } from "./src/modules/profile/changepfp";
import { GetUserReslover } from "./src/modules/user/getuser";
import { LoginReslover } from "./src/modules/user/login";
import { RegisterReslover } from "./src/modules/user/signup";


const app = express();
app.use(express.json())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

const main = async() => {
  const schema = await buildSchema({
    resolvers: [
      RegisterReslover, 
      LoginReslover, 
      GetUserReslover, 
      ChangeBioReslover, 
      ChangePfpReslover,
    ChangeFullNameReslover,
    ChangePasswordReslover,],
  })
  const appoloserver = new ApolloServer({schema});
 await appoloserver.start()
 await  appoloserver.applyMiddleware({app})
}
main()
app.listen(5000, () => {
    console.log("http://localhost:5000/graphql")
})
