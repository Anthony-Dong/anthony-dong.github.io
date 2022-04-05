HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this),e.appendChild(this)},NexT.utils={wrapImageWithFancyBox:function(){document.querySelectorAll(".post-body :not(a) > img, .post-body > img").forEach((e=>{var t=$(e),o=t.attr("data-src")||t.attr("src"),a=t.wrap(`<a class="fancybox fancybox.image" href="${o}" itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>`).parent("a");t.is(".post-gallery img")?a.attr("data-fancybox","gallery").attr("rel","gallery"):t.is(".group-picture img")?a.attr("data-fancybox","group").attr("rel","group"):a.attr("data-fancybox","default").attr("rel","default");var n=t.attr("title")||t.attr("alt");n&&(a.append(`<p class="image-caption">${n}</p>`),a.attr("title",n).attr("data-caption",n))})),$.fancybox.defaults.hash=!1,$(".fancybox").fancybox({loop:!0,helpers:{overlay:{locked:!1}}})},registerExtURL:function(){document.querySelectorAll("span.exturl").forEach((e=>{let t=document.createElement("a");t.href=decodeURIComponent(atob(e.dataset.url).split("").map((e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2))).join("")),t.rel="noopener external nofollow noreferrer",t.target="_blank",t.className=e.className,t.title=e.title,t.innerHTML=e.innerHTML,e.parentNode.replaceChild(t,e)}))},registerCopyCode:function(){document.querySelectorAll("figure.highlight").forEach((e=>{const t=document.createElement("div");e.wrap(t),t.classList.add("highlight-container"),t.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-clipboard fa-fw"></i></div>');var o=e.parentNode.querySelector(".copy-btn");o.addEventListener("click",(e=>{var t=e.currentTarget,o=[...t.parentNode.querySelectorAll(".code .line")].map((e=>e.innerText)).join("\n"),a=document.createElement("textarea");a.style.top=window.scrollY+"px",a.style.position="absolute",a.style.opacity="0",a.readOnly=!0,a.value=o,document.body.append(a);const n=document.getSelection(),r=n.rangeCount>0&&n.getRangeAt(0);a.select(),a.setSelectionRange(0,o.length),a.readOnly=!1;var i=document.execCommand("copy");CONFIG.copycode.show_result&&(t.querySelector("i").className=i?"fa fa-check fa-fw":"fa fa-times fa-fw"),a.blur(),t.blur(),r&&(n.removeAllRanges(),n.addRange(r)),document.body.removeChild(a)})),o.addEventListener("mouseleave",(e=>{setTimeout((()=>{e.target.querySelector("i").className="fa fa-clipboard fa-fw"}),300)}))}))},wrapTableWithBox:function(){document.querySelectorAll("table").forEach((e=>{const t=document.createElement("div");t.className="table-container",e.wrap(t)}))},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach((e=>{if(["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some((t=>e.src.includes(t)))&&!e.parentNode.matches(".video-container")){const t=document.createElement("div");t.className="video-container",e.wrap(t);let o=Number(e.width),a=Number(e.height);o&&a&&(e.parentNode.style.paddingTop=a/o*100+"%")}}))},registerScrollPercent:function(){var e=document.querySelector(".back-to-top"),t=document.querySelector(".reading-progress-bar");window.addEventListener("scroll",(()=>{if(e||t){var o=document.querySelector(".container").offsetHeight,a=window.innerHeight,n=o>a?o-a:document.body.scrollHeight-a,r=Math.min(100*window.scrollY/n,100);e&&(e.classList.toggle("back-to-top-on",window.scrollY>50),e.querySelector("span").innerText=Math.round(r)+"%"),t&&(t.style.width=r.toFixed(2)+"%")}})),e&&e.addEventListener("click",(()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})}))},registerTabsTag:function(){document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault();var t=e.currentTarget;if(!t.classList.contains("active")){[...t.parentNode.children].forEach((e=>{e.classList.remove("active")})),t.classList.add("active");var o=document.getElementById(t.querySelector("a").getAttribute("href").replace("#",""));[...o.parentNode.children].forEach((e=>{e.classList.remove("active")})),o.classList.add("active"),o.dispatchEvent(new Event("tabs:click",{bubbles:!0}))}}))})),window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){window.addEventListener("message",(({data:e})=>{if("string"==typeof e&&e.includes("ciu_embed")){var t=e.split(":")[1],o=e.split(":")[2];document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(o,10)+5+"px"}}),!1)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item").forEach((e=>{var t=e.querySelector("a[href]");if(t){var o=t.pathname===location.pathname||t.pathname===location.pathname.replace("index.html",""),a=!CONFIG.root.startsWith(t.pathname)&&location.pathname.startsWith(t.pathname);e.classList.toggle("menu-item-active",t.hostname===location.hostname&&(o||a))}}))},registerLangSelect:function(){document.querySelectorAll(".lang-select").forEach((e=>{e.value=CONFIG.page.lang,e.addEventListener("change",(()=>{let t=e.options[e.selectedIndex];document.querySelectorAll(".lang-select-label span").forEach((e=>e.innerText=t.text));let o=t.dataset.href;window.pjax?window.pjax.loadUrl(o):window.location.href=o}))}))},registerSidebarTOC:function(){const e=document.querySelectorAll(".post-toc li"),t=[...e].map((e=>{var t=e.querySelector("a.nav-link"),o=document.getElementById(decodeURI(t.getAttribute("href")).replace("#",""));return t.addEventListener("click",(e=>{e.preventDefault();var t=o.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:t+10})})),o}));var o=document.querySelector(".post-toc-wrap");!function a(n){n=Math.floor(n+1e4);let r=new IntersectionObserver(((r,i)=>{let c=document.documentElement.scrollHeight+100;if(c>n)return i.disconnect(),void a(c);let l=function(e){let o=0,a=e[o];if(a.boundingClientRect.top>0)return o=t.indexOf(a.target),0===o?0:o-1;for(;o<e.length;o++){if(!(e[o].boundingClientRect.top<=0))return t.indexOf(a.target);a=e[o]}return t.indexOf(a.target)}(r);!function(e){if(!e.classList.contains("active-current")){document.querySelectorAll(".post-toc .active").forEach((e=>{e.classList.remove("active","active-current")})),e.classList.add("active","active-current");for(var t=e.parentNode;!t.matches(".post-toc");)t.matches("li")&&t.classList.add("active"),t=t.parentNode;window.anime({targets:o,duration:200,easing:"linear",scrollTop:o.scrollTop-o.offsetHeight/2+e.getBoundingClientRect().top-o.getBoundingClientRect().top})}}(e[l])}),{rootMargin:n+"px 0px -100% 0px",threshold:0});t.forEach((e=>{e&&r.observe(e)}))}(document.documentElement.scrollHeight)},hasMobileUA:function(){let e=navigator.userAgent;return/iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g.test(e)},isTablet:function(){return window.screen.width<992&&window.screen.width>767&&this.hasMobileUA()},isMobile:function(){return window.screen.width<767&&this.hasMobileUA()},isDesktop:function(){return!this.isTablet()&&!this.isMobile()},supportsPDFs:function(){let e=navigator.userAgent,t=e.includes("irefox")&&parseInt(e.split("rv:")[1].split(".")[0],10)>18,o=void 0!==navigator.mimeTypes["application/pdf"],a=/iphone|ipad|ipod/i.test(e.toLowerCase());return t||o&&!a},initSidebarDimension:function(){var e=document.querySelector(".sidebar-nav"),t="none"!==e.style.display?e.offsetHeight:0,o=CONFIG.sidebar.offset||12,a=CONFIG.back2top.enable&&CONFIG.back2top.sidebar?document.querySelector(".back-to-top").offsetHeight:0,n=2*CONFIG.sidebar.padding+t+a;"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme||(n+=2*o-22);var r=document.body.offsetHeight-n+"px";document.querySelector(".site-overview-wrap").style.maxHeight=r,document.querySelector(".post-toc-wrap").style.maxHeight=r},updateSidebarPosition:function(){var e=document.querySelector(".sidebar-nav"),t=document.querySelector(".post-toc");if(t?(e.style.display="",e.classList.add("motion-element"),document.querySelector(".sidebar-nav-toc").click()):(e.style.display="none",e.classList.remove("motion-element"),document.querySelector(".sidebar-nav-overview").click()),NexT.utils.initSidebarDimension(),this.isDesktop()&&"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme){var o=CONFIG.page.sidebar;"boolean"!=typeof o&&(o="always"===CONFIG.sidebar.display||"post"===CONFIG.sidebar.display&&t),o&&window.dispatchEvent(new Event("sidebar:show"))}},getScript:function(e,t,o){if(o)t();else{var a=document.createElement("script");a.onload=a.onreadystatechange=function(e,o){(o||!a.readyState||/loaded|complete/.test(a.readyState))&&(a.onload=a.onreadystatechange=null,a=void 0,!o&&t&&setTimeout(t,0))},a.src=e,document.head.appendChild(a)}},loadComments:function(e,t){if(!CONFIG.comments.lazyload||!e)return void t();let o=new IntersectionObserver(((e,o)=>{e[0].isIntersecting&&(t(),o.disconnect())}));return o.observe(e),o},mediumZoomFunc:function(){const e=mediumZoom(".post-body :not(a) > img, .post-body > img");e.on("open",(e=>{var t=e.target.alt;document.querySelectorAll(".medium-zoom-image").forEach((e=>{""!=e.style.zoom&&e.alt==t&&(e.alt=e.alt+"|"+e.style.zoom,e.style.zoom="")}))})),e.on("closed",(e=>{var t=e.target.alt;document.querySelectorAll(".medium-zoom-image").forEach((e=>{if(e.alt==t){var o=e.alt.lastIndexOf("|");-1!=o&&(e.style.zoom=e.alt.substring(o+1),e.alt=e.alt.substring(0,o))}}))}))}};