import graphDB from "../base";
import {Comment} from "../../type/types"

async function saveCommet(params: Comment) {
    const { replyTo } = params;
  let queryString = "";
    if (!replyTo) {
        queryString = "CREATE (cmd:COMMENT {text:{text}, userId:{userId}, userName:{userName}}) RETURN ID(cmd)";
  } else {  
        queryString = `MATCH (parent:COMMENT) WHERE ID(parent) = ${replyTo}
        CREATE(reply:COMMENT {text:{text}, userId:{userId}, userName:{userName}})
        CREATE(parent) - [: REPLY_TO] -> (reply) RETURN ID(reply)`;
  }
  try {
      return graphDB.query(queryString, params);    
    } catch (error) {
        throw error; 
    }
  
}

async function updateCommet(text: string, id: number) {
    let queryString = `MATCH (cmd:COMMENT) WHERE ID(cmd) = ${id} SET cmd.text = {text} RETURN cmd`;
    try {
        return graphDB.query(queryString, {text:text});      
    } catch (error) {
        throw error;
    }
  
}

async function deleteCommet(id: number) {
    let queryString = `MATCH (cmd:COMMENT)
    WHERE ID(cmd) = ${id}
    DELETE cmd`;
    try {
        return graphDB.query(queryString);    
    } catch (error) {
        throw error;  
    }
    
}
async function getCommet(id: number) {
    let queryString = ` MATCH (cmd:COMMENT)
    WHERE ID(cmd) = ${id}
    RETURN cmd`;
    try {
        return graphDB.query(queryString);    
    } catch (error) {
       throw error; 
    }
    
}
async function getCommets() {
    let queryString = `MATCH (root:COMMENT)  - [:REPLY_TO] -> () 
        MATCH path = (root)-[:REPLY_TO*]-()
        WITH collect(path) as paths
        CALL apoc.convert.toTree(paths) yield value
        RETURN value`;
        try {
            return graphDB.query(queryString, {});        
        } catch (error) {
            throw error
        }
    
}


export default {
    saveCommet,updateCommet,deleteCommet,getCommet,getCommets
};
