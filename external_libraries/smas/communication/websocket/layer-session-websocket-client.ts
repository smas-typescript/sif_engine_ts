/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - Websocket"
legal: "See notice at end of class."
 */

import {AddressInformationWeb} from 'address-information-web'
import {Layer} from 'layer'
import {LayerSessionWebsocket} from 'layer-session-websocket'
import {Websocket_mode} from 'enumeration-websocket-mode'

export class LayerSessionWebsocketClient extends LayerSessionWebsocket 
{
    // Creation
        constructor(a_higher_layer: Layer) 
        {
            super(Websocket_mode.Client, a_higher_layer)
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