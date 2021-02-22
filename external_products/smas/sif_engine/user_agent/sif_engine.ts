/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: ""
legal: "See notice at end of class."
 */

 import {AddressInformationWeb} from 'address-information-web'
import {LayerSessionWebsocketClient} from 'layer-session-websocket-client'
import {LayerApplicationSif} from 'layer-application-sif'
import {SifInteractionElement} from 'sif-interaction-element'
import {SifSystemInterfaceViewable} from 'sif-system-interface-viewable'


let system_interface = new SifSystemInterfaceViewable()

let sif_arguments: Map< string, string> = new Map<string, string>()

let sif_engine_script_element: HTMLElement | null = document.getElementById("sif_engine")

let sif_engine_arguments_element: HTMLElement | null = document.getElementById("sif_engine_arguments")
if(sif_engine_arguments_element instanceof HTMLDivElement && sif_engine_arguments_element.innerHTML !== "")
{
    try
    {
        let l_json_arguments: Object = JSON.parse(sif_engine_arguments_element.innerHTML, (key, value) => 
        {
            sif_arguments.set(key, value)
            console.log("Argument key " + key)
            console.log("Argument value " + value )
        } )
    }
    catch(err)
    {
        // Not parseable, so it is a bad string of arguments
        console.log(err)
    }
}

if( sif_engine_script_element !== null)
{
    let sif_engine_script_ws_url = sif_engine_script_element.getAttribute("ws_url")

    if( sif_engine_script_ws_url !== null)
    {
        let url = new URL(sif_engine_script_ws_url)

        let address_info = new AddressInformationWeb(url)

        let layer_communication_sif = new LayerApplicationSif(system_interface, sif_arguments)

        let ws_client = new LayerSessionWebsocketClient(layer_communication_sif)
        layer_communication_sif.set_lower_layer(ws_client)

        ws_client.connect(address_info)
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