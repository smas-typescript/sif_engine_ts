/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

import {LayerApplicationSif} from 'layer-application-sif'
import {MessageSif} from 'message-sif'
import {SifIeControlWeb} from 'sif-ie-control-web'
import {SifInteractionElement} from 'sif-interaction-element'
import {SifInteractionElementExpanded} from 'sif-interaction-element-expanded'
import {SifView} from 'sif-view'
import {classToPlain} from "class-transformer"

export class MessageSifInteractionElement extends MessageSif
{
    // Creation
        constructor(a_application_layer: LayerApplicationSif, a_in_message: boolean, a_control?: SifIeControlWeb)
        {
            super(a_application_layer, a_in_message)
            this.application_layer_sif = a_application_layer
            if(a_control !== undefined)
            {
                this.control = a_control
            }
        }
    // Configuration
        reset()
        {
            this.view = undefined
            this.control = undefined
            this.ie_interaction_element_expanded = undefined
        }
    // Transmission
        data_unit_to_transmit(): string
            // <Precursor>
        {
            let result: string

            result = ""
            if(this.control !== undefined)
            {
                let expanded_type = this.control.expanded_type(this.message_identifier())
                let expanded_type_as_object = classToPlain(expanded_type)
                
                result = JSON.stringify(expanded_type_as_object)
                console.log(this.class_tag + "json result =>" + result)
            }
            return result
        }
    // Execution
        execute(a_data_unit: string) : void
        {
            if(this.view !== undefined && this.control !== undefined && this.ie_interaction_element_expanded !== undefined)
            {
                this.control.handle_interaction(this.ie_interaction_element_expanded)
            }
        }
    // Implementation
        protected do_parse_json(a_json_object: Object): void
        {
            let view_identifier = a_json_object["view_identifier"]
            let ie_identifier = a_json_object["identifier"]

            if(view_identifier !== undefined && ie_identifier !== undefined)
            {
                if(this.application_layer_sif.system_interface.active_views.has(view_identifier))
                {
                    this.view = this.application_layer_sif.system_interface.active_views.get(view_identifier)
                    if(this.view !== undefined && this.view.has_interaction_element(ie_identifier) && this.view.has_control_with_identifier(ie_identifier))
                    {
                        if(this.view.has_control_with_identifier(ie_identifier))
                        {
                            let l_control = this.view.get_control(ie_identifier)
                            if(l_control instanceof SifIeControlWeb)
                            {
                                this.control = l_control
                                this.is_parseable = this.control.is_parseable(a_json_object)
                                this.ie_interaction_element_expanded = this.control.interaction_element_expanded(a_json_object)
                            }
                        }
                    }
                }
            }
        }
        
        protected application_layer_sif: LayerApplicationSif

        protected view?: SifView

        protected control?: SifIeControlWeb

        protected ie_interaction_element_expanded?: SifInteractionElementExpanded 

        protected message_identifier() : string
        {
            return "message_sif_web_interaction"
        }

        private class_tag: string = "MessageSifInteractionElement: "
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/