/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

// import {EventTypeEvent} from 'event-type-event'
import {EventTypeList} from 'event-type-list'
import {SifMessageIeExpanded} from 'sif-message-ie-expanded'
import {Type, Exclude} from 'class-transformer/decorators'

export class SifMessageIeListExpanded extends SifMessageIeExpanded
    // This class is to be used for class to json conversions
    // While the nature of the sif based on websocket is communication of sif messages
    // is formatted in JSON, this and derived classes are used as an intermediary
    // Mostly due to the fact that reflection mechanisms in TypeScript currently do not work good enough.
    {
        constructor(a_id_message: string, a_identifier: number, a_view_identifier: number)
        {
            super(a_id_message, "sif_ie_list", a_identifier, a_view_identifier)
            this.event_list = undefined
        }
        do_handle_events(a_events: Map<string, boolean>): void
        {
            let has_event_list:boolean | undefined
            
            has_event_list = a_events.get("event_input_selection")
            if(has_event_list !== undefined && has_event_list)
            {
                this.event_input_selection = new EventTypeList()
                this.event_input_selection.published = true
            }
        }
    // Implementation

        @Type(() => EventTypeList)
        event_list?: EventTypeList

        @Type(() => EventTypeList)
        event_input_selection?: EventTypeList

}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/