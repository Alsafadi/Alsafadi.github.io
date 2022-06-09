var HTMLpublication = '%authors% (%date%) \'%title%\' <i>%journal%\</i>,<b>%volume%</b> %issue%%pages%PMID:<a href="%data%"target="_blank"> %PMID% </a></br></br>' //Formats output

var publications, idStringList;
var pubmedSearchAPI = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?";
var pubmedSummaryAPI = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?";
var database = "db=pubmed";
var returnmode = "&retmode=json";
var returnmax = "&retmax=1000";
var searchterm = "&term='lung bioengineering and regeneration'AND'lund'[Affiliation]";
var returntype = "&rettype=abstract";
var idURL = pubmedSearchAPI + database + returnmode + returnmax + searchterm
console.log(idURL);

var getPubmed = function(url) { //passed url
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) { //status 200 signifies OK (http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp)
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
};

// input.addEventListener('input', updateValue);
window.onload = updateValue;

function updateValue(e) {
  searchterm = '&term=lung bioengineering regeneration[Affiliation] AND lund university[Affiliation]';
  idURL = pubmedSearchAPI + database + returnmode + returnmax + searchterm
  console.log(idURL);

getPubmed(idURL).then(function(data) {
    var idList = data.esearchresult.idlist;
    idStringList = idList.toString(); //converts the idlist to a string to be appended to the search url
    idStringList = '&id=' + idStringList;
    summaryURL = pubmedSummaryAPI + database + returnmode + returntype + idStringList;
    getPubmed(summaryURL).then(function(summary) {
        publications = formatReferences(summary);
        console.log(publications);	
		document.getElementById("pubs").innerHTML = publications;
		
    }, function(status) {
        publications = 'Something went wrong getting the ids.';
    });
}, function(status) {
    publications = 'Something went wrong getting the ids.';
});

}

function updateMemValue(sterm, pID) {
    searchterm = '&term='+sterm+'[Author]';
    idURL = pubmedSearchAPI + database + returnmode + returnmax + searchterm
    console.log(idURL);
  
  getPubmed(idURL).then(function(data) {
      var idList = data.esearchresult.idlist;
      idStringList = idList.toString(); //converts the idlist to a string to be appended to the search url
      idStringList = '&id=' + idStringList;
      summaryURL = pubmedSummaryAPI + database + returnmode + returntype + idStringList;
      getPubmed(summaryURL).then(function(summary) {
          publications = formatReferences(summary);
          console.log(publications);	
          document.getElementById(pID).innerHTML = publications;
          
      }, function(status) {
          publications = 'Something went wrong getting the ids.';
      });
  }, function(status) {
      publications = 'Something went wrong getting the ids.';
  });
  
  }

function formatReferences(summary) {
    var publicationList = '';
    for (refs in summary.result) {
        if (refs !== 'uids') {
            var authors = '';
            var publication = '';
            var authorCount = ((summary.result[refs].authors).length);
            var i = 0;
            while (i < authorCount - 1) {
                authors += summary.result[refs].authors[i].name + ', ';
                i++;
            }
            publication = HTMLpublication.replace('%data%', 'http://www.ncbi.nlm.nih.gov/pubmed/' + refs);
            authors += summary.result[refs].lastauthor;
            publication = publication.replace('%authors%', authors);
            publication = publication.replace('%title%', summary.result[refs].title);
            publication = publication.replace('%journal%', summary.result[refs].source);
            publication = publication.replace('%PMID%', summary.result[refs].uid);
            //Alter formatting if article is In Press
            if (summary.result[refs].volume !== '') {
                publication = publication.replace('%volume%', ' ' + summary.result[refs].volume);
                publication = publication.replace('%issue%', '(' + summary.result[refs].issue + ')');
                publication = publication.replace('%pages%', ': ' + summary.result[refs].pages + '. ');
                var date = summary.result[refs].pubdate.slice(0, 4);
                publication = publication.replace('%date%', date + '');
            } else {
                publication = publication.replace('%volume%', ' In Press');
                publication = publication.replace('%issue%', '.');
                publication = publication.replace('%pages%', '');
                publication = publication.replace('%date%', '');
            }
            publicationList = publication + publicationList;
        }
    }
    return (publicationList);
} 