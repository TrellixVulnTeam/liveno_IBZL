import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect } from "react";

interface MutationProps {
    username: string;
    Mutation: any;
  }
  export const UseCustomMutation: React.FC<MutationProps> | any = (username: any, Mutation: DocumentNode ) => {
    const [functionForDoingAction, { data }] = useMutation(
      Mutation,
      {
        variables: {
          username,
        },
      }
    );
  
    useEffect(() => {
      // fn trigger for change data
      functionForDoingAction({
        variables: {
          username: username,
        },
      });
      // console.log(JSON.stringify(data));
      // console.log(JSON.stringify(error, null, 2));
    }, []);
  
    
  
    
    return data;
   
  };

