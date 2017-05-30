var request = require('request');
var cheerio = require('cheerio');
var lineReader = require('line-reader');
var fs = require('fs')

lineReader.eachLine('urls', function(line, last) {
    request(line, {jar:true}, function(err,response,html){
        if(!err){
            var $ = cheerio.load(html)
            var mtitle = $('meta[name="title"]').attr('content');
            var mkeywords = $('meta[name="keywords"]').attr('content');
            var mdescription = $('meta[name="description"]').attr('content');

            var otype = $('meta[property="og:type"]').attr('content');
            var otitle = $('meta[property="og:title"]').attr('content');
            var ovideourl = $('meta[property="og:video:url"]').attr('content');
            var oimage = $('meta[property="og:image"]').attr('content');
            var odescription = $('meta[property="og:description"]').attr('content');
            var osite = $('meta[property="og:site_name"]').attr('content');
            var odate = $('meta[property="article:published_time"]').attr('content');


            var tsite = $('meta[name="twitter:site"]').attr('content');
            var ttitle = $('meta[name="twitter:title"]').attr('content');
            var tdescription = $('meta[name="twitter:description"]').attr('content');
            var timage = $('meta[name="twitter:image"]').attr('content');
            var tplayer = $('meta[name="twitter:player"]').attr('content');

            var psite = $('meta[property="twitter:site"]').attr('content');
            var ptitle = $('meta[property="twitter:title"]').attr('content');
            var pdescription = $('meta[property="twitter:description"]').attr('content');
            var pimage = $('meta[property="twitter:image"]').attr('content');
            var pplayer = $('meta[property="twitter:player"]').attr('content');

            var url= $('link[rel="canonical"]').attr('href');
            var oembed = $('link[type="application/json+oembed"]').attr('href');

            var writeData = {};
            writeData.url = url;
            writeData.keywords = mkeywords;

            if (osite) writeData.site = osite;

            if (tsite) writeData.site = tsite;
            else if(psite) writeData.site = psite;
            
            if (ttitle) writeData.title = ttitle;
            else if (ptitle) writeData.title = ptitle;
            else if (otitle) writeData.title = otitle;
            else if (mtitle) writeData.title = mtitle;

            if (tdescription) writeData.description = tdescription;
            else if (pdescription) writeData.description = pdescription;
            else if (odescription) writeData.description = odescription;
            else if (mdescription) writeData.description = mdescription;


            if (timage) writeData.image = timage;
            else if (pimage) writeData.image = pimage;
            else if (oimage) writeData.image = oimage;

            if (tplayer) writeData.player = tplayer;
            else if (pplayer) writeData.player = pplayer;

            writeData.oembed = oembed;
            fs.appendFileSync('output.json', JSON.stringify(writeData)+"\n")
            console.log('File successfully written! - Check your project directory for the output.json file');

        }
    })

});

