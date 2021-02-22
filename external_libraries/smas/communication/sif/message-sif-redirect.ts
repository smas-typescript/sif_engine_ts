/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

import {LayerApplicationSif} from 'layer-application-sif'
import {MessageSif} from 'message-sif'

export class MessageSifRedirect extends MessageSif
{
    // Creation
        constructor(a_application_layer: LayerApplicationSif)
        {
            super(a_application_layer, true)
            this.application_layer_sif = a_application_layer
        }
    // Configuration
        reset()
            // <Precursor>
        {
            this.uri = undefined
        }
    // Execution
        execute(a_data_unit: string) : void
        {
            if(this.uri !== undefined)
            {
                this.application_layer.disconnect()
                
                window.location.replace(this.uri)
            }
        }

    // Implementation
        protected do_parse_json(a_json_object: Object): void
        {
            if(a_json_object.hasOwnProperty("uri"))
            {
                this.uri = a_json_object["uri"]
                this.is_parseable = true
            }
       }
       protected application_layer_sif: LayerApplicationSif

       protected uri?: string

       protected message_identifier() : string
       {
           return "message_sif_redirect"
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