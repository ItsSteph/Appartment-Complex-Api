# Introduction 
A API built with Javascript and MongoDb/Mongoose. Deployed using docker CI/CD pipeline to Azure webservices.
The API can be reached on: ***

# Getting Started
1. Its deployed on ***

If link isnt working we probably stopped paying for it.
To get it working:
1. clone the repo
2. run the command: npm install
3. then npm start
4. Should be running on localhost:3000
5. Use postman or similiar program to use the API


Example JSON post:


    {
         "event":{
        "_id": "61b85527344f610e88aaf8fd",
        "in": true,
        "out": false,
        "date": null,
        "access": [ "61b853bd30c1c243b48e3d6c"],
        "tag": {
            "_id": "61b849e91bf66c50fcd987f7",
            "tagNumber": "0101A",
            "access" : [
            {
                "_id" : "61b853bd30c1c243b48e3d6c",
                "doorName" : "LGH"
            }],
            "tenant": 
            {
                "_id": "61b850231bf66c50fcd988a0",
                 "name": "Liam Jönsson",
                 "appartment": "0101"
            }
        },
        "door": {
            "_id": "61b853bd30c1c243b48e3d6c",
             "doorName": "LGH",
              "location": "Våning"
        },
        "__v": 0
    }

    
