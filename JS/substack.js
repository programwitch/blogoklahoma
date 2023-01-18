/*
* Blog Oklahoma Newsletter List From Substack
* Using Bootstrap, Fontawesome
* Using rss2json.com (Converts RSS to JSON, Fixes CORS issues)
*
* <div class="card mb-3">
*   <div class="card-body card-max bg-light p-2 rd25">
*     <h5 class="card-title">
*       <a href="https://blogoklahoma.substack.com" class="text-dark" target="_blank">
*         <span id="substackLoading"><i class="fas fa-rss fa-fw text-rss"></i></span> Newsletter
*       </a>
*    </h5>
*    <div id="substack">
*    </div>
*   </div>
* </div>
*
* Call loadSubstack() on loading page.
*
*/

function loadSubstack() {
	var FEED_URL = 'https://blogoklahoma.substack.com/feed'
	$('#substackLoading').html('<i class=\"fas fa-sync fa-fw fa-spin\"></i>');
   try {
		$.ajax({
			type: 'GET',
			url: "https://api.rss2json.com/v1/api.json?rss_url=" + FEED_URL,
			dataType: 'jsonp',
			success: function (result) {
				var items = result.items;
				var substack = '';				
				$(items).each(function (index, item) {
					substack = `<div class="card mb-3">`
					if (item.enclosure.type == 'image/jpeg') {
						substack = substack + `<a href="${item.link}"><img src="${item.enclosure.link}" class="card-img-top rd25" loading="lazy"></a>`
					}
					substack = substack + `<div class="card-body p-1">`
					substack = substack + `<div class="card-text p-1 pb-0"><a href="${item.link}">${item.title}</a></div>`
					substack = substack + `<div class="card-text text-muted p-1">${item.description}</div>`
					substack = substack + `</div></div>`
					$('#substack').append(substack);
				});
				$('#substackLoading').html('<i class=\"fas fa-rss fa-fw text-rss\"></i>');
			}
		});
	} catch (err) {
		console.error(err);
		$('#substackLoading').html('<i class=\"fas fa-exclamation-triangle fa-fw text-warning\"></i>');
	}	
} 