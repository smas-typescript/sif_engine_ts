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
import {SifIeTextExpanded} from 'sif-ie-text-expanded'
import {SifInteractionElement} from 'sif-interaction-element'
import {SifMessageIeExpanded} from 'sif-message-ie-expanded'
import {SifMessageIeEventExpanded} from 'sif-message-ie-event-expanded'
import {SifView} from 'sif-view'
import {plainToClass} from 'class-transformer'

export class ParagraphIe extends SifIeControlWeb
{
    // Creation
        constructor(a_interaction_element: SifInteractionElement, a_html_paragraph_element: HTMLParagraphElement, a_current_interacting_view: SifView, a_layer_application_sif: LayerApplicationSif) 
        {
            super(a_interaction_element, a_current_interacting_view, a_layer_application_sif)

            this.element = a_html_paragraph_element
            console.log("ParagraphIe: constructor")
        }
    // Json representation
        expanded_type(a_id_message: string): SifMessageIeExpanded
        {
            console.log("ParagraphIe: expanded_type")
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
            let ie_event = plainToClass(SifIeTextExpanded, a_json_object)
            if(ie_event instanceof SifIeTextExpanded)
            {
                result = true
                console.log(ie_event)
            }
            return result
        }
    // Interaction
        interaction_element_expanded(a_json_object: Object): SifInteractionElementExpanded | undefined
        {
            console.log("ParagraphIe: interaction element expanded")
            let result: SifInteractionElementExpanded | undefined

            result = undefined
            let ie_event = plainToClass(SifIeTextExpanded, a_json_object)
            if(ie_event instanceof SifIeTextExpanded)
            {
                result = ie_event
            }
            return result
        }
        do_handle_interaction(a_interaction_element: SifInteractionElementExpanded): void
        {
            console.log("ParagraphIe: handle interaction")
            if(a_interaction_element instanceof SifIeTextExpanded)
            {
                if(a_interaction_element.event_output !== undefined && a_interaction_element.event_output.published)
                {
                    let cstring_to_html_string: string

                    cstring_to_html_string = a_interaction_element.event_output.text.replace(new RegExp('\n','g'), '<br>')
                    cstring_to_html_string = cstring_to_html_string.replace(new RegExp('\t','g'), '&emsp;')
                    // this.element.innerHTML = this.element.innerHTML + cstring_to_html_string
                    this.element.innerHTML = cstring_to_html_string
                }
            }
        }

    // Implementation
        protected to_json_extended(a_json_object: Object): void
        {
        }

        protected element: HTMLParagraphElement

        protected do_reset_events(): void
        {
            this.events.set("event_output", false)
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