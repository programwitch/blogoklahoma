/*
*
* (Using Bootstrap, Fontawesome)
*
* <div class="card mb-3">
*     <div class="card-body card-max bg-light p-2 rd25">
*          <h5 class="card-title">
*              <a href="https://reddit.com/r/blogoklahoma" class="text-dark tt" target="_blank" title="Join us on Reddit: r/blogoklahoma">
* 					<span id="redditLoading"><i class="fab fa-reddit-alien fa-fw text-reddit"></i></span> Links
*				</a>
*           </h5>
*        <div id="reddit">
*        </div>
*     </div>
*   </div>
*
*/

function loadReddit() {
   $('#redditLoading').html('<i class=\"fas fa-sync fa-fw fa-spin\"></i>');
   try {
      $.getJSON('https://www.reddit.com/r/blogoklahoma.json?limit=10', function (d) {
        var redditPost = ''
        $('#redditLoading').html('<i class=\"fas fa-sync fa-fw fa-spin text-success\"></i>');
        $(d.data.children).each(function (index, post) {					
           redditPost = `<div class="card mb-3">`			
           if(post.data.preview !== undefined) {
            if(post.data.preview.images.length > 0) {
              redditPost = redditPost + `<a href="https://www.reddit.com${post.data.permalink}"><img src="${post.data.preview.images[0].source.url}" class="card-img-top rd25" loading="lazy"></a>`
            }
           }			
           redditPost = redditPost + `<div class="card-body p-1">` 			
           redditPost = redditPost + `<div class="card-text p-1"><a href="https://www.reddit.com${post.data.permalink}">${post.data.title}</a></div>` 
           redditPost = redditPost + `<div class="p-1"><a href="https://www.reddit.com${post.data.permalink}"small class="text-muted"><span title="Replies"><i class="fas fa-arrow-up fa-fw"></i> ${post.data.ups}</span></small>&nbsp;&nbsp;<small class="text-muted"><span title="Replies"><i class="fas fa-comment-dots fa-fw"></i> ${post.data.num_comments}</span></small></a></div>`
           redditPost = redditPost + `</div></div>`
           
           $('#reddit').append(redditPost);
        });
        $('#redditLoading').html('<i class=\"fab fa-reddit-alien fa-fw text-reddit\"></i>');
      }).fail(function(err) { 
        console.error(err);
        $('#redditLoading').html('<i class=\"fas fa-exclamation-triangle fa-fw text-warning\"></i>');					 
      });	
   } catch (err) {
     console.error(err);
     $('#redditLoading').html('<i class=\"fas fa-exclamation-triangle fa-fw text-warning\"></i>');
   }
  }