/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

// import {EventTypeEvent} from 'event-type-event'
import {EventTypeText} from 'event-type-text'
import {SifMessageIeExpanded} from 'sif-message-ie-expanded'
import {Type, Exclude} from 'class-transformer/decorators'

export class SifMessageIeTextExpanded extends SifMessageIeExpanded
    // This class is to be used for class to json conversions
    // While the nature of the sif based on websocket is communication of sif messages
    // is formatted in JSON, this and derived classes are used as an intermediary
    // Mostly due to the fact that reflection mechanisms in TypeScript currently do not work good enough.
    {
        constructor(a_id_message: string, a_identifier: number, a_view_identifier: number)
        {
            super(a_id_message, "sif_ie_text", a_identifier, a_view_identifier)
            this.event_input = undefined
        }
        do_handle_events(a_events: Map<string, boolean>): void
        {
            let has_event_input:boolean | undefined
            
            has_event_input = a_events.get("event_input")
            if(has_event_input !== undefined && has_event_input)
            {
                this.event_input = new EventTypeText()
                this.event_input.published = true
            }
        }
    // Implementation

        @Type(() => EventTypeText)
        event_input?: EventTypeText

}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/