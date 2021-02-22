/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - General"
legal: "See notice at end of class."
 */

import {LayerApplication} from 'layer-application'

export abstract class Message
{
    // Creation
        constructor(a_application_layer: LayerApplication, a_is_a_in_message: boolean)
        {
            if(a_is_a_in_message)
            {
                a_application_layer.put_message(this)
            }
            this.reset()
            this.application_layer = a_application_layer
        }
    // Configuration
        abstract reset(): void
            // Any properties set for flow and state need to reset to be able to reuse the same message
        
    // Parsing
        is_parseable: boolean

        parse(a_data_unit: string) : void
        {
            this.is_parseable = false
            this.do_parse(a_data_unit)
        }
    // Transmission
        data_unit_to_transmit(): string
            // Result is the data eunit to be transmitted for outgoing message
        {
            // Intended to be empty
            // Incoming only messages are not transmitted.
            return ""
        }
    // Execution
        execute(a_data_unit: string) : void
            // Execute the message, normally needs implementation for incoming messages only.
        {
            // Intended to be empty
            // Outgoing only messages are not executed.
        }

    // Implementation
        protected abstract do_parse(a_data_unit: string) : void

        protected application_layer: LayerApplication
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/