/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - Websocket"
legal: "See notice at end of class."
 */

import {AddressInformation} from 'address-information'

export class AddressInformationWeb extends AddressInformation
{
    // Creation
        constructor(a_url: URL)
        {
            super()
            this.url = a_url
        }

    // Implementation
    url: URL
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/