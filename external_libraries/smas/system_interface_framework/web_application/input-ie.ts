/*
author: "Crystal Huang"
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
import { SifMessageIeTextExpanded } from 'sif-message-ie-text-expanded';
import {SifView} from 'sif-view'
import {plainToClass} from 'class-transformer'

export class InputIe extends SifIeControlWeb
{
    // Creation
        constructor(a_interaction_element: SifInteractionElement, a_html_input_element: HTMLInputElement, a_current_interacting_view: SifView, a_layer_application_sif: LayerApplicationSif) 
        {
            super(a_interaction_element, a_current_interacting_view, a_layer_application_sif)
            this.element = a_html_input_element
            
            // ! Not working: setup a timer to transmit the text of this element to server every 5 seconds.  Window can not find the current object
            // let timerId = window.setInterval(this.publish_based_on_timer, 5000)

            // Add a listener to the element if a key is pressed.
            this.element.addEventListener('keyup', event => this.handel_key_up_event(event))

            console.log(this.class_tag + " constructor")
        }
    // Json representation 
    // for the Message on web socket transmit
        expanded_type(a_id_message: string): SifMessageIeExpanded
        {
            let result: SifMessageIeTextExpanded

            result = new SifMessageIeTextExpanded(a_id_message, this.interaction_element.identifier, this.current_interacting_view.view_identifier) 
            
            result.handle_events(this.events)

            //If event_input type is defined, then add content of this element into json text
            if(result.event_input !== undefined)
            {
                result.event_input.text = this.element.value
            }
            return result
        }
    // Parsing
        is_parseable(a_json_object: Object): boolean
        {
            let result: boolean

            result = false
            let ie_text_expanded = plainToClass(SifIeTextExpanded, a_json_object)
            if(ie_text_expanded instanceof SifIeTextExpanded)
            {
                result = true
                console.log(this.class_tag + "is parseable => " +ie_text_expanded)
            }
            return result
        }
    // Interaction
        interaction_element_expanded(a_json_object: Object): SifInteractionElementExpanded | undefined
        {
            console.log(this.class_tag + "interaction_element_expanded")
            let result: SifInteractionElementExpanded | undefined

            result = undefined
            let ie_text_expanded = plainToClass(SifIeTextExpanded, a_json_object)
            if(ie_text_expanded instanceof SifIeTextExpanded)
            {
                result = ie_text_expanded
            }
            return result
        }
        do_handle_interaction(a_interaction_element: SifInteractionElementExpanded): void
        {
            console.log(this.class_tag + ": handel interection")
            if(a_interaction_element instanceof SifIeTextExpanded)
            {
                if(a_interaction_element.event_output !== undefined && a_interaction_element.event_output.published)
                {
                    // this.element.innerHTML = this.element.innerHTML + a_interaction_element.event_output.text
                    this.element.innerHTML = a_interaction_element.event_output.text
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
            console.log(this.class_tag + "to json extended")

        }

        protected publish_event_input(): void
        {
            console.log(this.class_tag + "publish is called")
            this.events.set("event_input", true)
            this.layer_application_sif.web_interact(this)
            this.reset_events()
        }

        protected handel_key_up_event(a_event: KeyboardEvent)
        {
            if (a_event.which === 13) // If enter key is pressed, publish the event
            {
                this.publish_event_input()
            }
        }

        protected element: HTMLInputElement

        protected do_reset_events(): void
        {
            this.events.set("event_input", false)          
        }

        private class_tag: string ="InputIe: "

    }