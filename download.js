const fs = require('fs')

function downloadAndReadPage(url) {
	var download = require('download-file')
  
	var options = {
	    directory: "./data",
	    filename: "customer-data.csv"
	}
	 
	download(url, options, function(err){
	    if (err) throw err
	    console.log("Successfully downloaded CSV file")

		const csvFilePath=options.directory + '/' + options.filename
		const csv=require('csvtojson')
		csv()
		.fromFile(csvFilePath)
		.then((jsonObj)=>{
			let jsonValue = JSON.stringify(jsonObj)
		    fs.writeFile('./output.json', jsonValue, function(err) {
		    	console.log('Successfully wrote JSON to output.json')
		    })
		})

		const jsonArray = csv().fromFile(csvFilePath);
	})
}

//var url = "https://prod-edxapp.edx-cdn.org/assets/courseware/v1/07d100219da1a726dad5eddb090fa215/asset-v1:Microsoft+DEV283x+3T2018+type@asset+block/customer-data.csv"

downloadAndReadPage(process.argv[2])






