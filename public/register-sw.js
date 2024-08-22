       // from terbiumos!
            (async () => {
                if ('serviceWorker' in navigator) {
                    await navigator.serviceWorker.register('/sw.js', {
                        scope: '/sw/',
                    }).then(updateTransport);
        
       //             await navigator.serviceWorker.register('/dynsw.js', {
         //               scope: '/dyn/',
           //         });
                }

                if (!localStorage.getItem('HTfirstRun')) {
                    console.log('kongsole')
                    localStorage.setItem('HTfirstRun', false)
                    window.location.reload()
                }
            })();
        
            async function updateTransports() {
                BareMux.registerRemoteListener(navigator.serviceWorker.controller);
                let transport = localStorage.getItem('transport') || "EpxMod.EpoxyClient"
                // Feel free to remove this, its just for skids to stop making issues on it
                if (window.location.origin.includes('.pages.dev')) {
                    console.log('your static hosting, using TOMP Wisp Server.')
                    let wispserver = "wss://tomp.app/wisp"
                    BareMux.SetTransport(transport, { wisp: wispserver });
                } else {
                    console.log('Using Backend Wisp Server, if your static hosting just delete these lines bellow and uncomment out the text bellow')
                    //let wispserver = "wss://tomp.app/wisp" Uncomment if static hosting
                    let wispserver = `${window.location.origin.replace(/^https?:\/\//, 'ws://')}/wisp/`
                    BareMux.SetTransport(transport, { wisp: wispserver });
                }
            }
        
