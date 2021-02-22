/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

import {LayerApplication} from 'layer-application'
import {Message} from 'message'

export abstract class MessageSif extends Message
{
    // Creation
        constructor(a_application_layer: LayerApplication, a_is_a_in_message: boolean)
        {
            super(a_application_layer, a_is_a_in_message)
        }
    // Implementation
        protected do_parse(a_data_unit: string): void
        {

            try
            {
                let l_json_object: Object = JSON.parse(a_data_unit)
                
                if(l_json_object.hasOwnProperty("id_message") && l_json_object["id_message"] === this.message_identifier())
                {
                    this.do_parse_json(l_json_object)
                }
            }
            catch(err)
            {
                // Not parseable, so it is a bad data_unit
                console.log(err)
            }
        }
        protected do_parse_json(a_json_object: Object): void
        {
            // Intended to be empty.
            // Used for message which are outgoing only
        }

        protected abstract message_identifier() : string
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/