/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

import {EventTypeEvent} from 'event-type-event'
import {EventTypeText} from 'event-type-text'
import {SifMessageIeExpanded} from 'sif-message-ie-expanded'
import {Type, Exclude} from 'class-transformer/decorators'

export class SifMessageIeEventExpanded extends SifMessageIeExpanded
    // This class is to be used for class to json conversions
    // While the nature of the sif based on websocket is communication of sif messages
    // is formatted in JSON, this and derived classes are used as an intermediary
    // Mostly due to the fact that reflection mechanisms in TypeScript currently do not work good enough.
    {
        constructor(a_id_message: string, a_identifier: number, a_view_identifier: number)
        {
            super(a_id_message, "sif_ie_event", a_identifier, a_view_identifier)
            this.event = undefined
            this.event_output_select = undefined
            this.event_output_deselect = undefined
            this.event_label = undefined
        }
        do_handle_events(a_events: Map<string, boolean>): void
        {
            let is_event:boolean | undefined
            
            is_event = a_events.get("event")
            if(is_event !== undefined && is_event)
            {
                this.event = new EventTypeEvent()
                this.event.published = true
            }
        }
    // Implementation

        @Type(() => EventTypeEvent)
        event?: EventTypeEvent

        @Type(() => EventTypeEvent)
        event_output_select?: EventTypeEvent

        @Type(() => EventTypeEvent)
        event_output_deselect?: EventTypeEvent

        @Type(() => EventTypeEvent)
        event_label?: EventTypeText
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/