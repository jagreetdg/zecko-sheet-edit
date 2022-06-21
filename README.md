
# Zecko Website Category Assigner

A Simple JavaScript program which finds out the framework of E-commerce websites and assigns them framework categories respectively in a separate column of a pre-existing Google Sheet, using Express and Google Sheets API in Google Cloud Platform


## Local Setup

Clone the project

```bash
git clone https://github.com/jagreetdg/zecko-sheet-edit.git
```

Go to the root project directory

```bash
cd zecko-sheet-edit
```


## Installation

For intializing new npm project :

```bash
npm init
```
Next install the following dependencies
## Dependencies

#### nodemon (Dev Dependency)

```bash
npm install -D nodemon --global
```

#### express, ejs, googleapis node-fetch@2

```bash
npm install express ejs googleapis node-fetch@2
```


## Editing Necessary Variables and Code Sections

In **index.js** modify the following variables according to your spreadsheetID which can be found in the spreadsheet URL just before **/edit**

For Example, in this case :
https://docs.google.com/spreadsheets/d/1bH8CXfd5lz54gby22qeib7imzQ9R5s8EPxSazA_n6tQ/edit

Spreadsheet ID is **1bH8CXfd5lz54gby22qeib7imzQ9R5s8EPxSazA_n6tQ**

```javascript
const spreadsheetID = "1bH8CXfxxxxxxxxxxxxxxd5s8EPxSazA_n6tQ";
```

Next setup Sheets API by creating a new project in Google Cloud Console, enabling the Google Sheets API and creating a new credential key under it. Place the credential key in the root folder and rename it to **credentials.json**
## Usage

The app by default listens on port 1337, but you can modify it with your own message using this line :

```javascript
app.listen(1337,(req,res) => console.log("Running Server Zecko"));
```

To run the program, type in terminal :
```
nodemon index.js
```

Then open your browser on the listening port (by default 1337) by going to :
```
http://localhost:1337
```

On successful request, you should see the Raw Data of the first column containing the websites, and if you check the original sheet, the categories would be updated as well.


## Screenshots

Setup Google Cloud Credentials :
![Cloud](https://imgur.com/0UE2Hxd.png)

Code :
![Code](https://imgur.com/2vOe4br.png)

Raw Browser Output :
![Output](https://imgur.com/74yCLWD.png)

Sheet Before Run :
![Before](https://imgur.com/3zdZkiY.png)

Sheet After Run :
![After](https://imgur.com/GCoYpas.png)
