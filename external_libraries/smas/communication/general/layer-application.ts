/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - General"
legal: "See notice at end of class."
 */

import {Layer} from 'layer'
import {LayerSession} from 'layer-session'
import {Message} from 'message'

export abstract class LayerApplication extends Layer
{
    // Creation
        constructor() 
        {
            super()
            this.messages = new Set()
        }
    // Communication
        initialize(): void
        {
            // Intended to be empty
            // Override when initializing is needed on a application level
        }
        disconnect(): void
        {
            if(this.lower_layer !== undefined && this.lower_layer instanceof LayerSession)
            {
                this.lower_layer.disconnect()
            }
        }
        receive(a_data_unit: string): void
        {
            let l_count: number = this.messages.size
            let l_parseable: boolean = false
            let l_array_of_messages = [...this.messages]

            while (l_count > 0 && !l_parseable)
            {
                let message: Message = l_array_of_messages[l_count - 1]

                if(message !== undefined)
                {
                    message.reset()
                    message.parse(a_data_unit)

                    l_parseable = message.is_parseable
                }
                if(!l_parseable)
                {
                    l_count = l_count - 1
                }
            }
            if(l_parseable)
            {
                l_array_of_messages[l_count - 1].execute(a_data_unit)
            }
        }
    // Element Change
        put_message(a_message: Message): void
        {
            this.messages.add(a_message)            
        }
    // Status
    // Implementation
        protected messages: Set<Message>

}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/