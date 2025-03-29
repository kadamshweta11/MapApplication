# Manual To Run the Application
Technology Used= MERN Stack
# Getting Started with Map Application

# Connection up DataBase 
1. Create a ChemnitzData Database in MongoDb Compass.
2. Import All the Datasets(schools,kindergardens,socialTeenagerProjects,socialChildProjects) in the MongoDb compass.
3. Save and Connect Your ChemnitzData.

Connection String= mongodb://localhost:27017/ChemnitzData

Once the Connection is Successfull You are ready To run Backend.

# Steps To run BackEnd
Server Port=5000
To Run the backend Make sure you have node installed in the system.If package.json is missing then 'npm init'.
After the package.json is integrated its time to install all the dependencies i.e node_modules so go ahead and type 'npm install' in cmd.

Moving Forward to manually create a .env file as it is present in .gitignore so in folder chemnitz_Map_Backend->.env file

Copy paste the contents
```
MONGO_URI=mongodb://localhost:27017/ChemnitzData
PORT=3000
JWT_SECRET=databasemapapplication12
OPENCAGE_API_KEY=b42de9e0e0f3455a941eb9db644f655d

```
1. After Settign up all initial configuration lets run the server  go to the folder chemnitz_Map_Backend and run 'node server.js' cmd.
2. Once the server is started you are good to go for starting the Front End. 


# Steps To run Front End 
Port=3000

For Displaying the map on front End i am making use of React-leaflet.
This library i am using to integrate the leaftlet mapping with React which can help me to create interactive maps in react application.
for eg= 
"axios": "^1.7.2",
    "bootstrap-icons": "^1.11.3",
    "leaflet": "^1.9.4",
    "leaflet-geosearch": "^4.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.51.5",
    "react-icons": "^5.2.1",
    "react-leaflet": "^4.2.1",
    "react-router-dom": "^6.23.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"

To run the Front End go to folder chemnitz_map_app->npm start

Application will run on the port localhost/3000.

### To Check the API Documentation
Run the backend with (node server.js) and then check APIs with swagger
http://localhost:5000/api-docs/#/

Add the token from (Console->Application->token)
which is further useful for User Operations 

Now You can test All the APIs....

If you have any problem with datastructure then refer the schemas sections at the bottom to understand properly number or string...

###ouputs
![home](https://github.com/user-attachments/assets/bd964eab-52ee-4486-9ce9-d53fe920f1a5)



