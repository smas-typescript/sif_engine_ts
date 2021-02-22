/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

import {LayerApplicationSif} from 'layer-application-sif'
import {MessageSif} from 'message-sif'
import {classToPlain} from 'class-transformer'

export class MessageSifExecute extends MessageSif
{
    // Creation
        constructor(a_application_layer: LayerApplicationSif, a_in_message: boolean)
        {
            super(a_application_layer, a_in_message)
            this.application_layer_sif = a_application_layer
            this.json_data_unit = new Object()
        }
    // Configuration
        reset()
        {
            this.json_data_unit = new Object()
                // Just create a new Object to have an initial empty Object
        }
    // Transmission
        data_unit_to_transmit(): string
            // <Precursor>
        {
            this.json_data_unit["id_message"] = this.message_identifier()
            this.json_data_unit["arguments"] = new Object()
            let l_control = this.application_layer_sif.sif_arguments.forEach((value, key) => this.do_argument(value, key))
       
            return JSON.stringify(this.json_data_unit)
        }
        //protected do_argument(a_argument: string, a_key: string): void
        protected do_argument(a_argument: string, a_key: string): void
        {
            let l_json_arguments = this.json_data_unit["arguments"]

            l_json_arguments[a_key] = a_argument
        }
        protected json_data_unit: Object

        protected application_layer_sif: LayerApplicationSif

        //protected ie_interaction_element_expanded?: SifInteractionElementExpanded 

        protected message_identifier() : string
        {
            return "message_sif_execute"
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