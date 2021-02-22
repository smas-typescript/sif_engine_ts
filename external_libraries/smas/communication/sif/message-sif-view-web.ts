/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

import 'reflect-metadata';       // Keep this line first always, else the reflectJS library will cause a runtime error: TypeError: Reflect.getMetadata is not a function
import {EnumerationViewAction} from 'enumeration-view-action'
import {FactorySifIeControl} from 'factory-sif-ie-control'
import {LayerApplicationSif} from 'layer-application-sif'
import {MessageSif} from 'message-sif'
import {MessageSifViewExpanded} from 'message-sif-view-expanded'
import {plainToClass} from 'class-transformer'
import {SifView} from 'sif-view'
import {SifInteractionElement} from 'sif-interaction-element'
import {SifIeControl} from 'sif-ie-control';
import {SifIeControlWeb} from 'sif-ie-control-web'

export class MessageSifViewWeb extends MessageSif
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
            this.message_view_expanded = undefined
        }
    // Execution
        execute(a_data_unit: string) : void
        {
            if(this.message_view_expanded !== undefined)
            {
                if(this.message_view_expanded.action === EnumerationViewAction.Activate)
                {
                    let l_element: HTMLElement | null = document.getElementById(this.message_view_expanded.view_identifier.toString());

                    if( l_element instanceof HTMLDivElement )
                    {
                        if(this.application_layer_sif.system_interface.active_views.get(this.message_view_expanded.view_identifier) === undefined)
                        {
                            let view: SifView = new SifView(this.message_view_expanded.view_identifier, this.application_layer_sif.system_interface, l_element, this.message_view_expanded.html)
                        }
                    } else {
                        // TODO: Build it on fly?
                    }
                }
                if(this.message_view_expanded.action === EnumerationViewAction.Present)
                {
                    let view = this.application_layer_sif.system_interface.active_views.get(this.message_view_expanded.view_identifier)

                    console.log('execute the message: ')
                    if(view !== undefined)
                    {
                        console.log('execute the message: view is there')
                        view.interaction_elements = this.message_view_expanded.interaction_elements
                        view.html = this.message_view_expanded.html
                        view.present()
                        console.log("MessageSifViewWeb: execute total interaction elements = " + this.message_view_expanded.interaction_elements.length)
                        this.message_view_expanded.interaction_elements.forEach( (interaction_element) => this.do_handle_interaction_element(interaction_element))
                    }
                }
                if(this.message_view_expanded.action === EnumerationViewAction.Deactivate)
                {
                    let view = this.application_layer_sif.system_interface.active_views.get(this.message_view_expanded.view_identifier)
                    
                    if(view !== undefined)
                    {
                        view.deactivate()
                        this.application_layer_sif.system_interface.active_views.delete(this.message_view_expanded.view_identifier)
                    }
                }
            }
        }

    // Implementation
        protected do_parse_json(a_json_object: Object): void
        {
            let message_viewExpanded = plainToClass(MessageSifViewExpanded, a_json_object)
            if(message_viewExpanded instanceof MessageSifViewExpanded)
            {
                this.message_view_expanded = message_viewExpanded
                this.is_parseable = true
            }
       }
       protected do_handle_interaction_element(interaction_element: SifInteractionElement): void
       {
            if(this.message_view_expanded !== undefined)
            {
                let view = this.application_layer_sif.system_interface.active_views.get(this.message_view_expanded.view_identifier)
                
                let l_element: HTMLElement | null = document.getElementById(interaction_element.identifier.toString());

                if(view !== undefined)
                {
                    if(l_element instanceof HTMLButtonElement)
                    {
                        view.put_control( FactorySifIeControl.getInstance().create_ie_button(interaction_element, l_element, view, this.application_layer_sif) )
                    }
                    if(l_element instanceof HTMLTextAreaElement)
                    {
                        view.put_control( FactorySifIeControl.getInstance().create_ie_textarea(interaction_element, l_element,view, this.application_layer_sif) )
                    }
                    if(l_element instanceof HTMLParagraphElement)
                    {
                        view.put_control( FactorySifIeControl.getInstance().create_ie_paragraph(interaction_element, l_element,view, this.application_layer_sif) )
                    }
                    if(l_element instanceof HTMLInputElement)
                    {
                        view.put_control( FactorySifIeControl.getInstance().create_ie_input(interaction_element, l_element,view, this.application_layer_sif) )
                    }
                    if(l_element instanceof HTMLSelectElement)
                    {
                        view.put_control( FactorySifIeControl.getInstance().create_ie_select_control(interaction_element, l_element,view, this.application_layer_sif) )
                        
                    }
                }
            }
       }

       protected application_layer_sif: LayerApplicationSif

       protected message_view_expanded?: MessageSifViewExpanded

       protected message_identifier() : string
       {
           return "message_sif_web_view"
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
