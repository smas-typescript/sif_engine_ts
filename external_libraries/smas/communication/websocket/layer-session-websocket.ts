/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - Websocket"
legal: "See notice at end of class."
 */

import {AddressInformation} from 'address-information'
import {AddressInformationWeb} from 'address-information-web'
import {Layer} from 'layer'
import {LayerSession} from 'layer-session'
import {Websocket_mode} from 'enumeration-websocket-mode'

export abstract class LayerSessionWebsocket extends LayerSession 
{
    // Creation
        constructor(a_mode: Websocket_mode, a_higher_layer: Layer) 
        {
            super()
            this.mode = a_mode
            this.set_higher_layer(a_higher_layer)
            this.websocket = undefined
        }
        onopen() 
        {
            console.log('Socket opened...')
            this.connected()
            
            let sif_engine_spinner_element: HTMLElement | null = document.getElementById("sif-engine-spinner")
            if(sif_engine_spinner_element instanceof HTMLDivElement && sif_engine_spinner_element.parentElement != undefined)
            {
                sif_engine_spinner_element.parentElement.removeChild(sif_engine_spinner_element)
            }
        }
        onmessage(msg: MessageEvent) 
        {
            console.log(msg.data)
            this.receive(msg.data)
        }
    // Communication
        transmit(a_data_unit: string): void
        {
            if(this.websocket !== undefined)
            {
                this.websocket.send(a_data_unit)
            }
        }
       disconnect(): void
       {
            if(this.websocket !== undefined)
            {
                this.websocket.close()
            }
       }
    // The HTML5 Web Socket
        websocket?: WebSocket
    // Mode
        mode: Websocket_mode
    // Implementation
        protected do_connect(a_address_information: AddressInformationWeb)
        {
            if(a_address_information instanceof AddressInformationWeb)
            {
                this.websocket = new WebSocket(a_address_information.url.href)
                this.websocket.onopen = () => this.onopen()
                this.websocket.onmessage = msg => this.onmessage(msg)
            }
            else
            {
                throw new Error("Wrong address information type")
            }
        }
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/