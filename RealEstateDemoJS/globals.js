var availableTags = [];
var azureSearchQueryApiKey = "CC7DA24CECCEDD6D9E10BCC3A918932F";	// this is a query key for demo purposes
var baseSearchURL = "https://ocpsearch.search.windows.net/indexes/azureblob-index2";

var facetFiltersString = [];
var facetFiltersCollection = [];
var currentPage = 1;
var documentsToRetrieve = 5;	// This is the maximum documents to retrieve / page
