function fullSearch(q)
{
	// Basically refresh page with new search
	if (q == "")
		q = "*";
	execSearch(q);
}

function execSearch(q)
{
	// Execute a search
	var searchAPI = baseSearchURL + "/docs?api-version=2019-05-06&$top=" + documentsToRetrieve + "&$skip=" + documentsToRetrieve * (currentPage - 1) + "&$count=true&queryType=full&search=" + q;
	
	// Create filter based on string fields
	var filterQuery = '';
	$( "#summaryContainer" ).html('');
	
	if (filterQuery != '')
		searchAPI += "&$filter=" + filterQuery;
	
	$.ajax({
		url: searchAPI,
		beforeSend: function (request) {
			request.setRequestHeader("api-key", azureSearchQueryApiKey);
			request.setRequestHeader("Content-Type", "application/json");
			request.setRequestHeader("Accept", "application/json; odata.metadata=none");
		},
		type: "GET",
		success: function (data) {
			
			var htmlString = '';

			if (data.value.length > 0)
			{
				$("#docCount").html('Total Results: ' + data["@odata.count"]);
				
				for (var item in data["value"])
				{
				
					htmlString += "<div class='card m-1'><div class='row'>";
					
					htmlString += data.value[item].content.substring(0,150);;
					htmlString += "</div></div>";
				}
			}
			
			$( "#summaryContainer" ).append(htmlString);
		}
	});
}

function execSuggest(q, resolve)
{
	// Execute an autocomplete search to populate type ahead
	var searchAPI = baseSearchURL + "/docs/autocomplete?api-version=2017-11-11-Preview&suggesterName=sg&autocompleteMode=twoTerms&search=" + q;
	$.ajax({
		url: searchAPI,
		beforeSend: function (request) {
			request.setRequestHeader("api-key", azureSearchQueryApiKey);
			request.setRequestHeader("Content-Type", "application/json");
			request.setRequestHeader("Accept", "application/json; odata.metadata=none");
		},
		type: "GET",
		success: function (data) {
			availableTags = [];
			for (var item in data.value)
				availableTags.push(data.value[item].queryPlusText);
			resolve(availableTags);

		}
	});
}
