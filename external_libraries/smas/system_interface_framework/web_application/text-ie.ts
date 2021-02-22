/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "System Interface Framework - Web application"
legal: "See notice at end of class."
usage: "This class is to be used to handle all text related HTML element: <p><h1><input><textarea>...."
 */

import {LayerApplicationSif} from 'layer-application-sif'
import {SifIeControlWeb} from 'sif-ie-control-web'
import {SifInteractionElementExpanded} from 'sif-interaction-element-expanded'
import {SifIeTextExpanded} from 'sif-ie-text-expanded'
import {SifInteractionElement} from 'sif-interaction-element'
import {SifMessageIeExpanded} from 'sif-message-ie-expanded'
import {SifMessageIeTextExpanded} from 'sif-message-ie-text-expanded'
import {SifView} from 'sif-view'
import {plainToClass} from 'class-transformer'

export class TextIe extends SifIeControlWeb
{
    // Creation
        constructor(a_interaction_element: SifInteractionElement, a_html_text_element: HTMLElement, a_current_interacting_view: SifView, a_layer_application_sif: LayerApplicationSif) 
        {
            super(a_interaction_element, a_current_interacting_view, a_layer_application_sif)

            this.element = a_html_text_element

            // Add a listener to the element if a key is pressed.
            this.element.addEventListener('keyup', event => this.handel_key_up_event(event))
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
                console.log(this.class_tag + "event_input is defined. ")

                if(this.element instanceof HTMLInputElement || this.element instanceof HTMLSelectElement)
                {
                    result.event_input.text = (<HTMLInputElement>this.element).value
                }
            }

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
            if(a_interaction_element instanceof SifIeTextExpanded)
            {
                if(a_interaction_element.event_output !== undefined && a_interaction_element.event_output.published)
                {
                    let cstring_to_html_string: string

                    cstring_to_html_string = a_interaction_element.event_output.text.replace(new RegExp('\n','g'), '<br>')
                    cstring_to_html_string = cstring_to_html_string.replace(new RegExp('\t','g'), '&emsp;')
                    this.element.innerHTML = this.element.innerHTML + cstring_to_html_string
                }
                // if(a_interaction_element.event_unvisible !== undefined && a_interaction_element.event_unvisible.published)
                // {
                //     this.element.hidden = true
                // }
                // if(a_interaction_element.event_visible !== undefined && a_interaction_element.event_visible.published)
                // {
                //     this.element.hidden = false
                // }
                // if(a_interaction_element.event_disable !== undefined && a_interaction_element.event_disable.published)
                // {
                //     this.element.setAttribute("disabled", "true")
                // }
                // if(a_interaction_element.event_enable !== undefined && a_interaction_element.event_enable.published)
                // {
                //     this.element.setAttribute("disabled", "false")
                // }
            }
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

    // Implementation
        protected to_json_extended(a_json_object: Object): void
        {
        }

        protected element: HTMLElement

        protected do_reset_events(): void
        {
            this.events.set("event_input", false)
        }

        private class_tag: string ="TextIe: "
    }