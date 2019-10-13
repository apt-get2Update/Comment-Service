# Comment service

# Pre-reqs
- Install [Node.js](https://nodejs.org/en/)


# Getting started
- Clone the repository
```
git clone 
```
- Install dependencies
```
cd <project_name>
npm install
```
- Create Your DB in postgres 
``
createdb content-portal-dev
``
- Update DB Properties in file 
```
src/config/env/dev.json
```

- Build and run the project
```
npm start
```
Navigate to `http://localhost:3000`

Neo4j implementation
```
Download neo4j commiuunity edition 
  from https://neo4j.com/download-center/#community
  configure graphDB 
    https://neo4j.com/download-thanks/?edition=community&release=3.5.11&flavour=unix&_ga=2.67692114.2125451247.1570960818- 742204501.1570960818
   adding apoc plugin 
    https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/3.5.0.5
    download jar file from above link and add jar file to neo4j plugin folder
    set new password as password
Navigate to `http://localhost:3000`
