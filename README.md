## Usage Instructions
1) Clone this repository
```git clone https://github.com/KelfinTDetonator/CRUD-Basic-Banking-System-.git```
2) Create your .env in local repository (or you can see an example in env.sample file)
```
PORT=
DATABASE_URL= 
SECRET_KEY=   
```  
3) ```npm install``` to install all packages provided in the package.json  
4) ```npx prisma migrate dev``` or  ```npx prisma db push``` to migrate your database from prisma.schema  
5) Update your .gitignore  
```
node_modules
.env
README.md
```
## Showcase :tv: 
## Features :rocket:  
## Technologies Used :hammer:  
:black_medium_square: RESTful API   
:black_medium_square: Express JS  
:black_medium_square: Prisma ORM for PostgreSQL  
:black_medium_square: Vercel + RDS AWS  
:black_medium_square: Swagger  
:black_medium_square: Express-validator  
:black_medium_square: Jest Supertest  
:black_medium_square: JWT Authentication  
:black_medium_square: Bcrypt  
:black_medium_square: Morgan logger  
:black_medium_square: Nodemon  
:black_medium_square: dotenv  
:black_medium_square: Git  

## What I learned :computer:  
:black_medium_square: Learned how to guarantee a transaction with Prisma transaction (ACID)  
:black_medium_square: Visualize API responses and API endpoints with Swagger API documentation  
:black_medium_square: Controller-Service-Repository folder structure to achieve manageable code base and DRY (Don't Repeat Yourself) concepts   
:black_medium_square: Created .env to hide any sensitive informations and use it  
:black_medium_square: Testing API with Jest Supertest   
:black_medium_square: Organize JSON Web Token for user Authentication    
:black_medium_square: Hash an user password with Bcrypt library and learned how it works    
:black_medium_square: Error handling for each controllers  
:black_medium_square: Development environment technologies such as nodemon and Morgan logger    


