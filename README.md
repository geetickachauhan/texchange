# texchange
A Software Engineering semester project to buy and sell textbooks

Texchange allows university students to buy and sell used textbooks. Users are be able to look up the textbook by its title or author, see various prices available from different sellers, and purchase the one they desire. Conversely, they will also be able to list their own book for sale so other Users can purchase it. There will be three overall levels of user groups:

Guests: The first group is be known as Guests, which is able to visit the website and browse through all the listings of books being sold.
Registered Users: The second group is known as Registered Users, or just Users,  which are able to browse through the listings, but are also able to purchase/sell books. The Users are of two types: Buyer and Seller, and a User can be a buyer, seller or both. Buyers will be able to report Sellers as well as rate them and this rating will be visible alongside the Seller name in the website. Finally, the System will ask the User to verify their email before they can use any of the privileges offered to this group of user groups.
Administrators: The third group is known as Administrators, which are able to ban and unban Users and able to be contacted by the Registered Users.

This application has been developed using the MEAN stack.

Instructions on downloading:
1. clone the repository using git clone or download a zip file
2. install node, npm, bower and mongodb on your machine
3. in the top level directory, run npm install, bower install

Run using the following commands:
1. in the top level directory run mongod
2. in client, run grunt serve
3. in server, run nodemon index.js
