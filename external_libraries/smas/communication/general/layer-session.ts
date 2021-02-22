/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - General"
legal: "See notice at end of class."
 */

import {Layer} from 'layer'
import {LayerApplication} from 'layer-application'
import {AddressInformation} from 'address-information'

export abstract class LayerSession extends Layer
{
    // Creation
        constructor() 
        {
            super()
            this.internal_is_connected = false
        }
    // Session features
        connect(a_address_information: AddressInformation): void
            // Create a session for the current communication layer
        {
            this.do_connect(a_address_information)    
        }
        abstract disconnect(): void
            // Terminate the current session
            
        connected(): void
            // Indicate the session layer is in a connected state
        {
            this.internal_is_connected = true
            if(this.higher_layer !== undefined && this.higher_layer instanceof LayerApplication)
            {
                this.higher_layer.initialize()
            }
        }
    // Status
        is_connected(): boolean 
        {
            return this.internal_is_connected
        };
    // Implementation
        protected internal_is_connected: boolean

        protected abstract do_connect(a_address_information: AddressInformation)

}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/