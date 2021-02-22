/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

import {EventTypeEvent} from 'event-type-event'
import {Type, Exclude} from 'class-transformer/decorators'

export abstract class SifMessageIeExpanded
    // This class is to be used for class to json conversions
    // While the nature of the sif based on websocket is communication of sif messages
    // is formatted in JSON, this and derived classes are used as an intermediary
    // Mostly due to the fact that reflection mechanisms in TypeScript currently do not work good enough.
    {
        constructor(a_id_message: string, a_type: string, a_identifier: number, a_view_identifier: number)
        {
            this.identifier = a_identifier
            this.id_message = a_id_message
            this.type = a_type
            this.view_identifier = a_view_identifier
            this.event_visible = undefined
            this.event_unvisible = undefined
            this.event_enable = undefined
            this.event_disable = undefined
        }
        handle_events(a_events: Map<string, boolean>): void
        {
            this.do_handle_events(a_events)
            
            let event:boolean | undefined
            
            event = a_events.get("event_visible")
            if(event !== undefined && event)
            {
               this.event_visible = new EventTypeEvent()
               this.event_visible.published = true
            }
        }

        abstract do_handle_events(a_events: Map<string, boolean>): void

    // Implementation
        id_message: string

        type: string

        identifier: number

        view_identifier: number

        @Type(() => EventTypeEvent)
        event_visible?: EventTypeEvent

        @Type(() => EventTypeEvent)
        event_unvisible?: EventTypeEvent

        @Type(() => EventTypeEvent)
        event_enable?: EventTypeEvent

        @Type(() => EventTypeEvent)
        event_disable?: EventTypeEvent
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/