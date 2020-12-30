# Freshworks key-value data store assignment 

In the project directory, perform following action: 

1.	`npm install`  
2.	`npm start` (to start the server)
3.	Open postman ( or command line to execute commands ) for executing create, read and delete a data in and from a JSON file.

## Create API Call -

4.	POST method ( http://localhost:3000/submit )

Method 1-
You can create JSON object using the frontend by entering all the details in the given form.

You can set property called time-to-live for a key and write into a json file and this property is an optional. If ttl(in seconds) is given then the key will not be accessed for further read or delete operations after that time duration reached .

Method 2-
Create JSON object using Postman:-
It should be POST request in this way : Use postman and pass the key value pair in body.
`http://localhost:3000/submit`


{
    "name": "Prabhdeep Bagga ",
    "age": "22",
    "ttl": "40"
}


## Read API Call - 

5.	Read all Records-
	` GET 'http://localhost:3000/read/all'`

	Read a particular record using key

	GET method ( http://localhost:3000/read/key ) 
	eg. http://localhost:3000/read/eOtom8PSxDs1hfv

	For the above key its time to live duration is 120sec(2mins) after that key1 will be expired. If ttl is not given then it can be accessed everytime!


## Delete API Call - 

6. Delete all Records-
	` GET 'http://localhost:3000/delete/all'`

	Delete a particular record using key

	GET method ( http://localhost:3000/delete/key ) 
	eg. http://localhost:3000/delete/eOtom8PSxDs1hfv

	For the above key its time to live duration is 120sec(2mins) after that key1 will be expired. If ttl is not given then it can be accessed everytime!