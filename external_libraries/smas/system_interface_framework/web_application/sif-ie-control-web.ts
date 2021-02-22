/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "System Interface Framework - Web application"
legal: "See notice at end of class."
 */

import {LayerApplicationSif} from 'layer-application-sif'
import {SifIeControl} from 'sif-ie-control'
import {SifInteractionElementExpanded} from 'sif-interaction-element-expanded'
import {SifInteractionElement} from 'sif-interaction-element'
import {SifMessageIeExpanded} from 'sif-message-ie-expanded'
import {SifView} from 'sif-view'
import {SifIeTextExpanded} from 'sif-ie-text-expanded'

export abstract class SifIeControlWeb extends SifIeControl
{
    // Creation
        constructor(a_interaction_element: SifInteractionElement, a_current_interacting_view: SifView, a_layer_application_sif: LayerApplicationSif) 
        {
            super(a_interaction_element, a_current_interacting_view)
            this.layer_application_sif = a_layer_application_sif
            this.events = new Map()
            this.reset_events()
        }
    // Json representation
        abstract expanded_type(a_id_message: string): SifMessageIeExpanded

        to_json(): string
        {
            let result: string
            let l_json_object: Object

            l_json_object = new Object()
                        
            result = ""
            this.to_json_extended(l_json_object)
            return result
        }

    // Implementation
        protected abstract to_json_extended(a_json_object: Object): void

        protected events: Map<string, boolean>
        
        protected reset_events(): void
        {
            this.events.clear()
            this.events.set("event_visible", false)
            this.events.set("event_unvisible", false)
            this.events.set("event_enable", false)
            this.events.set("event_disable", false)
            this.do_reset_events()
        }

        handle_interaction(a_interaction_element: SifInteractionElementExpanded): void
        {
            if(a_interaction_element.event_unvisible !== undefined && a_interaction_element.event_unvisible.published)
            {
                this.element.hidden = true
            }
            if(a_interaction_element.event_visible !== undefined && a_interaction_element.event_visible.published)
            {
                this.element.hidden = false
            }
            this.do_handle_interaction(a_interaction_element)
        }

        protected element: HTMLElement

        protected abstract do_reset_events(): void

        protected abstract do_handle_interaction(a_interaction_element: SifInteractionElementExpanded): void

        protected layer_application_sif: LayerApplicationSif
    }

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/