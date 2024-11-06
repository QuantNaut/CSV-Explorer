# Technical Assessment: Fullstack Mini Project - File Upload Client (Frontend) + NodeJS Server (Backend)

## Company: ST Engineering

Related project repo link <u>[here](https://github.com/tqwdan82/Technical_Assessment)</u>

### Project Name: <u>CSV-Explorer</u>

#### <u>Given Problem Statement</u>
Create a React/Svelte frontend in Typescript and NodeJS web backend in Typescript/Javascript with the following functionalities.
1. Upload a CSV file with appropriate feedback to the user on the upload progress.
2. List the data uploaded with pagination.
3. Search data from the uploaded file. The web application should be responsive while listing of data and searching of data.

#### <u>Submission Requirement</u>
In your submission, must include the following:
1. Use the given csv file as the sample
2. Include unit tests with complete test cases including edge cases.
3. Provide a git repository for us to assess your submission.
4. Provide a readme in the git repository on how to setup and run the project.

## Setup Instructions

### 1. Setup MySQL Database
1. Download and install _MySQL_ database
2. Verify that you can connect to _MySQL_ and create tables
3. Execute these <u>[SQL query scripts](./Backend/Other/scripts.sql)</u> to create the two tables `file_list` and `filedata` and insert the test data.

### 2. Project Setup -- `./Backend` Folder
1. Rename the `.env.sample` file inside the root folder to `.env`, and fill in all the empty values that you see.
2. Create an empty directory at the same path that you set for value `UPLOAD_DIR` above, e.g. `"Other/tmp/"`
3. Run `npm install` to install the dependencies.
4. Run `npm run start:dev`.

### 3. Project Setup -- `./Frontend` Folder
1. Run `npm install` to install the dependencies.
2. Run `npm run dev`.
3. Open your browser and navigate to <u>`http://localhost:5173/`</u>.


#### <u>TO NOTE</u>:
You can choose to use the given CSV file, [data.csv](./data.csv), or create your own file for testing. However, any CSV file uploaded via the webapp needs to conform to the sample file structure below:

`"postId","id","name","email","body"`

`"1","1","id labore ex et quam laborum","Eliseo@gardner.biz","laudantium enim quasi est quidem magnam"`

`"1","2","quo vero reiciendis velit similique earum","Jayne_Kuhic@sydney.com","est natus enim nihil est dolore omnis voluptatem"`