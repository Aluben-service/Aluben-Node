var A=a=>typeof a==='string';const{isArray:_}=Array;function d(B){function C(_a,_b){if(_b&&c(_b))return _b(_a);if(_b&&_(_b)){for(let i=0;i<_b.length;i++)if(_b[i]&&c(_b[i]))_a=_b[i](_a);else break;return _a}return _a}if(B&&B!==''){if(!A(B))try{B=JSON.stringify(B)}catch(e){return!1}if(A(B)){B=C(B,!1,[str=>str.replace(/[\n\t]/gm,''),str=>str.replace(/,\}/gm,'}'),str=>str.replace(/,\]/gm,']'),D=>(D=D.split(/(?=[,\}\]])/g),D=D.map(s=>{if(s.includes(':')&&s){let _A=s.split(/:(.+)/,2);_A[0]=_A[0].trim();if(_A[0]){let E=_A[0].split(/([,\{\[])/g);E[E.length-1]=C(E[E.length-1],!1,p=>p.replace(/[^\w\-]/,''));_A[0]=E.join('')}let _B=_A[1].trim();((_B.startsWith('"')&&_B.endsWith('"'))||(_B.startsWith('\'')&&_B.endsWith('\''))||(_B.startsWith('`')&&_B.endsWith('`')))&&(_B=_B.substr(1,_B.length-2));_B=C(_B,!1,[p=>p.replace(/(")/gm,'\\$1'),p=>p.replace(/\\'/gm,'\''),p=>p.replace(/\\`/gm,'`')]);_A[1]=`"${_B}"`.trim();s=_A.join(':')}return s}),D.join('')),str=>str.replace(/(["'])?([\w\-]+)(["'])?:/g,'"$2":'),aA=>(aA=aA.split(/(?=[,\}\]])/g),aA=aA.map(s=>{if(s.includes(':')&&s){let aB=s.split(/:(.+)/,2);aB[0]=aB[0].trim();if(aB[1].includes('"')&&aB[1].includes(':')){let aC=aB[1].trim();(aC.startsWith('"')&&aC.endsWith('"'))&&(aC=aC.substr(1,aC.length-2),aC=C(aC,!1,p=>p.replace(/(?<!\\)"/gm,'')));aB[1]=`"${aC}"`.trim()}s=aB.join(':')}return s}),aA.join(''))]);try{B=JSON.parse(B)}catch(e){return!1}}return B}return!1}var e=document.querySelector('.gamecontainer'),c=a=>typeof a==='function';fetch('assets/json/games.json').then(res=>res.json()).then(aD=>{aD=d(aD);aD.sort((a,b)=>a.name.localeCompare(b.name));for(const aF of aD){var aE=document.createElement('li'),_c=aF.desc||' ';aE.innerHTML=`
        <div class="gamecard" data-category="${aF.categories}">
          <a href="#" onclick="localStorage.currentgame = '${aF.url}'; localStorage.currentgamename = '${aF.name}'; localStorage.currentgamecheat = '${aF.cheat}'; location.href='play.html';">
            <img title='${aF.name}' src="${aF.img}" class="gameimage"/>
          </a>
          <i onclick="pin('${aF.name}');" style="color:white;" class="fa fa-map-pin" aria-hidden="true"></i>
          <a href="#" onclick="localStorage.currentgame = '${aF.url}'; localStorage.currentgamename = '${aF.name}'; localStorage.currentgamecheat = '${aF.cheat}'; location.href='play.html';">
            <div class="gameinfo">
              <b>
                <p class="gamename">${aF.name}</p>
              </b>
              <p class="gamedesc">${_c}</p>
            </div>
          </a>
        </div>
      `;document.querySelector('.gamecontainer').appendChild(aE);if(localStorage.getItem(aF.name)=='pinned'){var _d=document.createElement('li'),_e=aF.desc||' ';_d.innerHTML=`
        <div class="gamecard" data-category="${aF.categories}">
          <a href="#" onclick="localStorage.currentgame = '${aF.url}'; localStorage.currentgamename = '${aF.name}'; localStorage.currentgamecheat '${aF.cheat}'; location.href='play.html';">
            <img title='${aF.name}' src="${aF.img}" class="gameimage"/>
          </a>
          <i onclick="pin('${aF.name}');" style="color:white;" class="fa fa-map-pin" aria-hidden="true"></i>
          <a href="#" onclick="localStorage.currentgame = ${aF.url}'; localStorage.currentgamename = ${aF.name}'; localStorage.currentgamecheat = ${aF.cheat}'; location.href='play.html';">
            <div class="gameinfo">
              <b>
                <p class="gamename">${aF.name}</p>
              </b>
              <p class="gamedesc">${_e}</p>
            </div>
          </a>
        </div>
      `;document.querySelector('.pinned').appendChild(_d)}}}).catch(aG=>console.error(aG));function f(){var aH=document.querySelectorAll('#category option:checked').map(aJ=>aJ.value),aI=document.getElementsByClassName('gamecard');for(var i=0;i<aI.length;i++){var _D=aI[i],_E=_D.getAttribute('data-category').split(' ');aH.length===0||aH.some(aK=>_E.includes(aK))?_D.style.display='block':_D.style.display='none'}}function g(aL){var aM=localStorage.getItem(aL)==='pinned';function _C(){try{localStorage.setItem(aL,aM?'':'pinned');localStorage.getItem('gamenotice')!='true'?Swal.fire({title:aM?'Unpinned!':'Pinned!',text:`This game has been ${aM?'unpinned':'pinned'}!`,icon:'success',confirmButtonColor:'#3085d6',confirmButtonText:'Don\'t show me again.'}).then(aN=>{aN.isConfirmed&&(localStorage.setItem('gamenotice','true'),Swal.fire({title:'Success!',text:'When you pin a game this won\'t be shown again.',icon:'success',confirmButtonColor:'#3085d6',confirmButtonText:'Ok'}).then(aO=>location.reload()))}):location.reload()}catch{Swal.fire({title:'Error!',text:`There was an issue with ${aM?'unpinning':'pinning'} this game.`,icon:'error',confirmButtonText:'Try Again'}).then(aP=>aP.isConfirmed&&_C())}}_C()}
