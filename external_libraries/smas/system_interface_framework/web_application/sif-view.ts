/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "System Interface Framework - Web application"
legal: "See notice at end of class."
 */

import {SifIeControl} from 'sif-ie-control'
import {SifInteractionElement} from 'sif-interaction-element'
import {SifSystemInterfaceViewable} from 'sif-system-interface-viewable'

export class SifView
{
        constructor(a_view_id: number, a_system_interface_viewable: SifSystemInterfaceViewable, a_element: HTMLElement, a_html: string)
        {
            this.view_identifier = a_view_id
            this.element = a_element
            this.html = a_html
            this.interaction_elements = new Array()
            this.system_interface = a_system_interface_viewable
            a_system_interface_viewable.active_views.set(a_view_id, this)
            this.controls = new Array()
        }
    // Presentation
        present(): void
        {
            this.element.innerHTML = this.html
        }
        deactivate(): void
        {
            this.element.innerHTML = ""
        }
    // Element change
        put_control(a_control:SifIeControl): void
        {
            this.controls.push(a_control)
        }
    // Status
        has_interaction_element(a_identifier: number): boolean
        {
            let l_interaction_element = this.interaction_elements.find(ie => this.find_interaction_element(a_identifier, ie))
            
            return l_interaction_element !== undefined
        }

        protected find_interaction_element(a_interaction_element_to_be_found: number, a_interaction_element: SifInteractionElement): boolean
        {
            return a_interaction_element_to_be_found === a_interaction_element.identifier
        }

        has_control_with_identifier(a_identifier: number): boolean
        {
            let l_control = this.controls.find(control => this.find_control(a_identifier, control))
            
            return l_control !== undefined
        }

        protected find_control(a_interaction_element_of_control_to_be_found: number, a_control: SifIeControl): boolean
        {
            return a_interaction_element_of_control_to_be_found === a_control.interaction_element.identifier
        }
    // Query
        get_interaction_element(a_identifier: number): SifInteractionElement | undefined
        {
            return this.interaction_elements.find(ie => this.find_interaction_element(a_identifier, ie))
        }
        get_control(a_identifier: number): SifIeControl | undefined
        {
            return this.controls.find(control => this.find_control(a_identifier, control))
        }
    // Implementation, public for plainToClass
        view_identifier: number

        element: HTMLElement

        html: string

        interaction_elements: Array<SifInteractionElement>

    // Implementation
        system_interface: SifSystemInterfaceViewable
            // The system interface which is able to present current view

        controls: Array<SifIeControl>
            // All controls related to this view
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/