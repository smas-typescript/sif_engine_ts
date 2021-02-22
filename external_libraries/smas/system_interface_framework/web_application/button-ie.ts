/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "System Interface Framework - Web application"
legal: "See notice at end of class."
 */

import {LayerApplicationSif} from 'layer-application-sif'
import {SifIeControlWeb} from 'sif-ie-control-web'
import {SifInteractionElementExpanded} from 'sif-interaction-element-expanded'
import {SifIeEventExpanded} from 'sif-ie-event-expanded'
import {SifInteractionElement} from 'sif-interaction-element'
import {SifMessageIeExpanded} from 'sif-message-ie-expanded'
import {SifMessageIeEventExpanded} from 'sif-message-ie-event-expanded'
import {SifView} from 'sif-view'
import {plainToClass} from 'class-transformer'

export class ButtonIe extends SifIeControlWeb
{
    private class_tag: string = "ButtonIe"

    // Creation
        constructor(a_interaction_element: SifInteractionElement, a_html_button_element: HTMLButtonElement, a_current_interacting_view: SifView, a_layer_application_sif: LayerApplicationSif) 
        {
            super(a_interaction_element, a_current_interacting_view, a_layer_application_sif)

            this.element = a_html_button_element
            this.element.addEventListener('click', event => this.publish_button_pressed(event))
            console.log(this.class_tag + ": construction")
        }
    // Json representation
        expanded_type(a_id_message: string): SifMessageIeExpanded
        {
            let result: SifMessageIeEventExpanded

            result = new SifMessageIeEventExpanded(a_id_message, this.interaction_element.identifier, this.current_interacting_view.view_identifier) 
            result.handle_events(this.events)

            return result
        }
    // Parsing
        is_parseable(a_json_object: Object): boolean
        {
            let result: boolean

            result = false
            let ie_event = plainToClass(SifIeEventExpanded, a_json_object)
            if(ie_event instanceof SifIeEventExpanded)
            {
                result = true
                console.log(ie_event)
            }
            return result
        }
    // Interaction
        interaction_element_expanded(a_json_object: Object): SifInteractionElementExpanded | undefined
        {
            console.log(this.class_tag + ": interaction_element_expanded")
            let result: SifInteractionElementExpanded | undefined

            result = undefined
            let ie_event = plainToClass(SifIeEventExpanded, a_json_object)
            if(ie_event instanceof SifIeEventExpanded)
            {
                result = ie_event
            }
            return result
        }
        do_handle_interaction(a_interaction_element: SifInteractionElementExpanded): void
        {
            console.log(this.class_tag + ": handle_interaction")
            
            if(a_interaction_element instanceof SifIeEventExpanded)
            {
                if(a_interaction_element.event_label !== undefined && a_interaction_element.event_label.published)
                {
                    this.element.innerText = a_interaction_element.event_label.text
                }
                if(a_interaction_element.event_disable !== undefined && a_interaction_element.event_disable.published)
                {
                    this.element.disabled = true
                }
                if(a_interaction_element.event_enable !== undefined && a_interaction_element.event_enable.published)
                {
                    this.element.disabled = false
                }
            }
        }

    // Implementation
        protected to_json_extended(a_json_object: Object): void
        {
        }

        protected publish_button_pressed(a_event: MouseEvent) 
        {
            this.events.set("event", true)
            this.layer_application_sif.web_interact(this)
            this.reset_events()
        }

        protected element: HTMLButtonElement

        protected do_reset_events(): void
        {
            this.events.set("event", false)
            this.events.set("event_output_select", false)
            this.events.set("event_output_deselect", false)
            this.events.set("event_label", false)
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