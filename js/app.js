//console.log($)
//console.log('Works')

//Sneaky JSON requests
//var jsonUserTest = $.getJSON('https://api.github.com/users/jordan-wicker?'+myApiSecret)
//var jsonRepoTest = $.getJSON('https://api.github.com/users/jordan-wicker/repos?'+myApiSecret)

// console.log(jsonUserTest)
// console.log(jsonRepoTest)

var getBio = function(){
   $.getJSON('https://api.github.com/users/jordan-wicker?'+myApiSecret)
}
var repoSelector = document.querySelector('.repository-container')
var profile = document.querySelector('.profile-container')
var menuSelector = document.querySelector('.pic-dropdown')

var getBio = function(){
   $.getJSON('https://api.github.com/users/jordan-wicker?'+myApiSecret).then(function(serverRes){

  var bioHTML = '<img src="' + serverRes.avatar_url + '"/>'
      bioHTML +=    '<h1>' + serverRes.name + '</h1>'
      bioHTML +=    '<h3>' + serverRes.login + '</h3>'
      bioHTML +=    '<button type="button" class="btn btn-default btn-sm follow-btn">Follow</button>'
      bioHTML +=    '<a href="#"><p class"sm-text">Block or report user</p></a> '
      bioHTML +=    '<hr/>'
      bioHTML +=    '<ul class="bio-list">'
      bioHTML +=      '<li><i class="fa fa-users" aria-hidden="true"><p>' + serverRes.company + '</p></i></li>'
      bioHTML +=      '<li><i class="fa fa-map-marker marker" aria-hidden="true"><p>' + serverRes.location + '</p></i></li>'
      bioHTML +=      '<li><i class="fa fa-envelope-o" aria-hidden="true"><p>' + serverRes.email + '</p></i></li>'
      bioHTML +=      '<li><i class="fa fa-link" aria-hidden="true"><p>' + serverRes.html_url + '</p></i></li>'
      bioHTML +=      '<li><i class="fa fa-clock-o" aria-hidden="true"><p>Joined on ' + serverRes.created_at + '</p></i></li>'
      bioHTML +=    '</ul>'

  profile.innerHTML = bioHTML
  })
}

var getRepo = function(userArg) {
   $.getJSON('https://api.github.com/users/jordan-wicker/repos?'+myApiSecret).then(function(serverRes){

    var repoHTML =  '<div class="repos-container">'
        repoHTML +=    '<ul class="repos-header">'
        repoHTML +=      '<li>Overview</li>'
        repoHTML +=      '<li>Repositories</li>'
        repoHTML +=      '<li>Stars</li>'
        repoHTML +=      '<li>Followers</li>'
        repoHTML +=      '<li>Following</li>'
        repoHTML +=    '<ul>'
        repoHTML +=  '</div>'
        repoHTML +=  '<div class="repo-input"><input type="text" class="repo-input" placeholder="Seach repositories..."></input><hr/></div>'



    for (var i = 0; i< serverRes.length; i += 1) {
      repoHTML += '<li class="repo-box">' + serverRes[i].name + '<div class="stargazer">' + '<i class="fa fa-star star" aria-hidden="true"></i>' + serverRes[i].stargazers_count + '</div>' + '<div class="language">' + serverRes[i].language + '</div></li>'
    }
    var repoData = repoHTML + '</ul>'
    repoSelector.innerHTML = repoData
  })
}

function gitExplore(e) {
    var inputValue = document.querySelector('.nav-section')
    if (e.keyCode == 13) {
        window.location.hash = inputValue.value
    }
}

function droppingMenu(){
  console.log([drpDwnMenu.classList])
  if(drpDwnMenu.classList.contains('open')) {
    drpDwnMenu.classList.remove('open')

  } else {

    drpDwnMenu.classList.add('open')
  }
}

var hashFunction= function(){
  var noHash = window.location.hash.slice(1)
  // console.log(noHash)
  if(noHash.length === 0){
    getBio('jordan-wicker')
    getRepo('jordan-wicker')
  }
  getBio(noHash)
  getRepo(noHash)
}
document.addEventListener('click', droppingMenu)
window.addEventListener('hashchange', hashFunction)
window.addEventListener('keydown', gitExplore)
hashFunction()


if(typeof myApiSecret === 'undefined'){
   var myApiSecret = ''
}
