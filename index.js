const express = require("express");
const { google } = require("googleapis");

const app = express();
app.get("/", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});

	//Spreadsheet URL : https://docs.google.com/spreadsheets/d/1bH8CXfd5lz54gby22qeib7imzQ9R5s8EPxSazA_n6tQ/edit#gid=0
	const spreadsheetID = "1bH8CXfd5lz54gby22qeib7imzQ9R5s8EPxSazA_n6tQ";

	//Client Instance
	const client = await auth.getClient();

	//Google Sheets API Instance
	const googleSheets = google.sheets({ version: "v4", auth: client });

	//Read First Row of Websites
	const getRows = await googleSheets.spreadsheets.values.get({
		auth,
		spreadsheetId: spreadsheetID,
		range: "TestRun!A:A",
	});

	const websites = getRows.data.values;
	let categories = [["Category"]];
	const categoriesList = [
		"SHOPIFY", //0
		"WOOCOMMERCE", //1
		"BIGCOMMERCE", //2
		"MAGENTO", //3
		"OTHERS", //4
		"NOT_WORKING", //5
	];
	const sz = websites.length;
	for (let i = 1; i < sz; i++) {
		var categoryInd = 4; //DEFAULT=OTHERS

		//FETCH
		try {
			const fetch = require("node-fetch");
			const result = await fetch(websites[i]);
			const html = await result.text();
			if (html.match("shopify") != null) {
				categoryInd = 0;
			} else if (html.match("woocommerce") != null) {
				categoryInd = 1;
			} else if (html.match("bigcommerce") != null) {
				categoryInd = 2;
			} else if (html.match("magento") != null) {
				categoryInd = 3;
			}
		} catch (err) {
			categoryInd = 5;
			//Website Not Working
			//res.send('err : ',err);
		}
		//FETCH ENDS

		categories.push([categoriesList[categoryInd]]);
	}

	console.log(categories); //Debug frameworks to console

	//Write to Second Row
	await googleSheets.spreadsheets.values.append({
		auth,
		spreadsheetId: spreadsheetID,
		range: "TestRun!B:B",
		valueInputOption: "USER_ENTERED",
		resource: {
			values: categories,
		},
	});

	res.send(getRows.data);
});

app.listen(1337, (req, res) => console.log("Running Server Zecko"));
