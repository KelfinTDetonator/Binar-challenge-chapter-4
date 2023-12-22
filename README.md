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
:black_medium_square: Swagger API docs
![Screenshot (1556)](https://github.com/KelfinTDetonator/CRUD-Basic-Banking-System-/assets/91953273/12c11e6c-78f1-4c27-bc5c-380210b9b0c5)  
:black_medium_square: Create user
![Screenshot (1557)](https://github.com/KelfinTDetonator/CRUD-Basic-Banking-System-/assets/91953273/bcb27a51-a77c-4227-b64f-8294723544a0)
:black_medium_square: Create user error because password is too weak 
![Screenshot (1558)](https://github.com/KelfinTDetonator/CRUD-Basic-Banking-System-/assets/91953273/a8436a64-36b0-4952-b90e-d2f86768c072)  
:black_medium_square: Login user  
![Screenshot (1559)](https://github.com/KelfinTDetonator/CRUD-Basic-Banking-System-/assets/91953273/dec4efd2-d146-4baa-bda6-4440b6a3770d)  
:black_medium_square: Create Bank Account before transaction
![Screenshot (1560)](https://github.com/KelfinTDetonator/CRUD-Basic-Banking-System-/assets/91953273/958aeb34-4acf-4e22-b6a9-f4e970eb43ad)  
:black_medium_square: Transaction  
![Screenshot (1561)](https://github.com/KelfinTDetonator/CRUD-Basic-Banking-System-/assets/91953273/489d76ee-86e7-41d8-8cca-7abffcc5b0e1)  
![Screenshot (1562)](https://github.com/KelfinTDetonator/CRUD-Basic-Banking-System-/assets/91953273/15b59e48-082c-401e-bcde-ac29b3488360)  

## Features :rocket:  
:black_medium_square: Withdraw or deposit money through API  
:black_medium_square: Login/register user to protect sensitive endpoints  
:black_medium_square: CRUD Bank account  
:black_medium_square: CRUD User data & user profile    
:black_medium_square: Find any transaction data & Delete transaction data      

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
:black_medium_square: Organize JSON Web Token for user Authentication and protect sensitive endpoints      
:black_medium_square: Hash an user password with Bcrypt library and learned how it works    
:black_medium_square: Error handling for each controllers  
:black_medium_square: Development environment technologies such as nodemon and Morgan logger    


