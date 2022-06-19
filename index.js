const express = require('express');
const {google} = require('googleapis');

const app = express();
app.get("/",async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })

    //Spreadsheet URL : https://docs.google.com/spreadsheets/d/1bH8CXfd5lz54gby22qeib7imzQ9R5s8EPxSazA_n6tQ/edit#gid=0
    const spreadsheetID = "1bH8CXfd5lz54gby22qeib7imzQ9R5s8EPxSazA_n6tQ";

    //Client Instance
    const client = await auth.getClient();

    //Google Sheets API Instance
    const googleSheets = google.sheets({version: "v4", auth: client});

    //Read First Row of Websites
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: spreadsheetID,
        range : "TestRun!A:A",
    });

    const websites = getRows.data.values;
    let categories = [["Category"]];
    const categoriesList = ["SHOPIFY", "WOOCOMMERCE", "BIGCOMMERCE", "MAGENTO", "OTHERS", "NOT_WORKING"];
    const sz = websites.length;
    for (let i = 1; i < sz; i++) {
        //TODO Update this line to assign meaningful category
        const categoryInd = (i%6); //For now this sequentially assigns categories
        categories.push([categoriesList[categoryInd]]);
    }

    //Write to Second Row
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: spreadsheetID,
        range: "TestRun!B:B",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: categories
        }
    })

    res.send(getRows.data);
});

app.listen(1337,(req,res) => console.log("Running Server Zecko"));