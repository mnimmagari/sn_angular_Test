
You must follow the instructions to start the project code:
-----------------------------------------------------------
1) You must have nodeJS installed in your local. Please visit the official site to download and
   install available here https://nodejs.org/en/download/
2) Unzip the sn_angularjs_test.zip and change your current directory to sn_angularjs_test directory.
3) Run “$ npm install” in terminal or command prompt depending on mac os or windows.
4) Start the local httpserver with command $ ./node_modules/.bin/http-server
5) Open the browser with http://127.0.0.1:8080


Ask: Attempt the following
-------------------------------------------
1) Add a new field to the model called Author
2) Add a new field to the model called creation date
3) Add a new field to the model called file size
4) Make the column headings clickable and clicking them should cycle
through sorting by ascending, descending and no order
5) Add a search row below the heading row, each column contains a search
field. Entering a value in the search field should filter data only based on
values in that column (unlike the search above the table which filters
based on data in any field)
6) Add another action next to the pencil icon on each row to delete the
record



db.products.find({"email": ObjectId("568c28fffc4be30d44d0398e")})