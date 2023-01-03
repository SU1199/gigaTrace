
# gigaTrace

CDR & Tower Dump analysis, management and OSINT software.

####  What's a CDR?
The phone companies maintain the record of all calls in what is called a cell tower
dump. These dumps contain a treasure trove of information like where and when the
call was made from, whom it was made to, the cell tower code from where the call was
made and disconnected, the type of call, the imei and imsi of the caller etc.

gigaTrace is built to handle gigabytes of these dumps concurrently and provides pogChamp analysis tools to do intel work on these records.

It is divided into two distinct modules 
1. The parsing server.
2. The analysis and osint server.

## Parsing server
![upload](https://user-images.githubusercontent.com/20323373/210308993-c75700d2-2e7e-440e-89ad-c87c2036da62.PNG)

it parses excel files, cleans and standardizes them, adds necessary metadata to it and stores it in an sql database (postgres in this case)

## Analysis server
This module  is responsible for doing all the computation, query generation and serving  application securely over internet or local network. It also has has basic OSINT tools built in.

### Features
##### Dashboard
![dash](https://user-images.githubusercontent.com/20323373/210309115-020aece1-2986-4930-9efe-610ad2e21c3a.PNG)

##### Location based analysis.
![1](https://user-images.githubusercontent.com/20323373/210309127-4f05520f-b547-4cbb-bdd1-af76f54872fe.gif)

Who was at _____ , _____ and ____ during ______ date and time.
> Uses google maps places api to get co-ordinates of entered places.
The distance between these locations and all the cell towers in database is measured (haversine formula) are the records of nearest towers is scanned to find the intersection of mobile number between them.

##### Mobile number tracking.
![2](https://user-images.githubusercontent.com/20323373/210309217-0f9e41a4-c80d-4534-ae6d-f53ef6ed691e.gif)

Where was ____ number on/between ____ date/time.

##### IMEI tracking.
![3](https://user-images.githubusercontent.com/20323373/210309284-e1e290dd-84b5-42de-822f-7155e6376e6e.gif)

Where was ____ phone on/between ____ date/time.

##### Most contacted number.
![4](https://user-images.githubusercontent.com/20323373/210309300-f0a4d626-ead7-489b-9244-940c8b6443c2.gif)

Find the most contacted number of _____ number on/between ______ date/time.

##### Common Contacted Number.
![5](https://user-images.githubusercontent.com/20323373/210309311-1e71027a-f956-4e2c-bbea-55e2b8b4abfc.gif)

Find common contacts of ___ , ___ , ___ between ___ and ___

##### International Or Spoof Calls.
![9](https://user-images.githubusercontent.com/20323373/210309385-ffc701e8-0c4d-4949-8bb3-fffdd02a800d.gif)

Find calls coming from ____ country using the IMSI numbers.

##### SMS-Services Analysis
![10](https://user-images.githubusercontent.com/20323373/210309399-6bb4d6f2-a0d0-4a39-863f-2de7a71a1d21.gif)

Find what services ______ number uses.

##### Contact Graph.
![6](https://user-images.githubusercontent.com/20323373/210309414-38c727c4-0abc-44fc-b010-538a673ed0dc.gif)

Build a graph of all contacts of ___ number ____ in depth
> Makes a graph of all numbers contacted by a number and numbers contacted by those numbers and so on… until the specified depth is reached .Breadth first search is used to build the graph.

##### OSINT search.
![osint](https://user-images.githubusercontent.com/20323373/210309535-fdf0218c-eae5-4071-bfe2-1b05a944e4f9.gif)

> Uses the truecaller api I reverse-engenered [here](http://blog.danishjoshi.com/reverse-engineering-truecaller-mobile-app-and-making-a-bot-out-of-the-exposed-apis/) to get intel about a number instantly. Also uses a reverse engineered [eyeCon](https://www.eyecon-app.com/) api to get social media addresses associated with that number.

##### SU Mode
![11](https://user-images.githubusercontent.com/20323373/210309817-4936eacb-93e5-4222-9459-06627240e7d8.gif)

> Run sql queries on the postgres db in your browser.
#### Some notes:
- This project was build during a police hackathon during the first week of September, 2022.
- It has been tested on real world multi gigabyte dumps received by police IRL.
- The sample dumps are provided in the gigaTrace/dumps folder.
- Supply you own google places keys in the static components.
- Get your own truecaller api keys by following [this tutorial](http://blog.danishjoshi.com/reverse-engineering-truecaller-mobile-app-and-making-a-bot-out-of-the-exposed-apis/).
