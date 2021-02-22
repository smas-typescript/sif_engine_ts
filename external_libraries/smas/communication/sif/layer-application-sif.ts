/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

import {LayerApplication } from 'layer-application'
import {MessageSifExecute} from 'message-sif-execute'
import {MessageSifInteractionElement} from 'message-sif-interaction-element'
import {MessageSifRedirect} from 'message-sif-redirect'
import {MessageSifViewWeb} from 'message-sif-view-web'
import {SifIeControlWeb} from 'sif-ie-control-web'
import {SifSystemInterfaceViewable } from 'sif-system-interface-viewable'

export class LayerApplicationSif extends LayerApplication
{
    // Creation
        constructor(a_system_interface: SifSystemInterfaceViewable, a_sif_arguments:Map<string,string>)
        {
            super()
            this.system_interface = a_system_interface
            this.sif_arguments = a_sif_arguments
            this.put_message(new MessageSifViewWeb(this))
            this.put_message(new MessageSifInteractionElement(this, true))
            this.put_message(new MessageSifRedirect(this))
        }
    // Communication
        initialize(): void
        {
            let l_msg_execute: MessageSifExecute
            
            l_msg_execute = new MessageSifExecute(this, false)
                        
            this.transmit (l_msg_execute.data_unit_to_transmit())
         }
    // Web interaction
        web_interact(a_web_control: SifIeControlWeb)
        {
            let l_msg_interaction_element: MessageSifInteractionElement

            l_msg_interaction_element = new MessageSifInteractionElement(this, false, a_web_control)
            
            this.transmit (l_msg_interaction_element.data_unit_to_transmit())
        }
    // Implementation
        system_interface: SifSystemInterfaceViewable

        sif_arguments: Map<string, string>
            // Arguments which are used to execute the correct sif interactor at the remote server
            // Can be used to control server execution from a query string in the initial sif engine script attribute query-arguments.

}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/