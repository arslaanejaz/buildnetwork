(function(){var css=getBannerCss(),head=document.head||document.getElementsByTagName('head')[0],style=document.createElement('style');style.type='text/css';if(style.styleSheet){style.styleSheet.cssText=css;}else{style.appendChild(document.createTextNode(css));}
head.appendChild(style);var bannerWrapper=document.getElementsByClassName('js-demo-avd')[0];bannerWrapper.innerHTML=getBannerHTML();bannerWrapper.addEventListener('click',function(event){if(event.target.className=='demo-avd__close'){event.preventDefault();bannerWrapper.setAttribute('style','display: none;');bannerWrapper.remove();}});function getBannerCss(){return '.demo-avd{position:fixed;width:200px;border-radius:0.3em;overflow:hidden;-webkit-box-shadow:0 4px 20px rgba(0,0,0,0.2);box-shadow:0 4px 20px rgba(0,0,0,0.2);z-index:99;top:20px;right:20px}.demo-avd--light .demo-avd__label{color:rgba(255,255,255,0.7)}.demo-avd--light .demo-avd__text a{color:white}.demo-avd--dark .demo-avd__label{color:rgba(0,0,0,0.5)}.demo-avd--dark .demo-avd__text a{color:rgba(0,0,0,0.8)}.demo-avd__img a,.demo-avd__img svg{display:block}.demk-avd__text-wrapper{padding:16px;font-family: sans-serif !important;}.demo-avd__label{text-transform:uppercase;font-size:0.9rem;letter-spacing:0.1em;margin:0 0 0.6em}.demo-avd__text a{font-size:1.4rem;display:block;line-height:1.4}.demo-avd__text a:hover{text-decoration: underline;}.demo-avd__close{display:block;width:32px;height:32px;position:absolute;z-index:1;top:0;right:0;background:url(../../assets/img/icon-avd-close.svg) no-repeat 0 0;opacity:0.8;cursor:pointer}.demo-avd__close:hover{opacity:1}';}
function getBannerHTML(){return '<div class="demo-avd__img"><a href="https://nucleoapp.com/?ref=2214"><img src="../../assets/img/sponsor/demo.svg" alt="Nucleo Icons"></a></div><div class="demk-avd__text-wrapper"><div class="demo-avd__label">Sponsored by</div><p class="demo-avd__text"><a href="https://nucleoapp.com/?ref=2214">Nucleo is a free app to organize your icons and export them as icon font and SVG symbols.</a></p></div><div class="demo-avd__close"></div>';}})();