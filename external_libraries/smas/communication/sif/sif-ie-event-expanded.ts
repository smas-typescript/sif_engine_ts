/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

import 'reflect-metadata'       // Keep this line first always, else the reflectJS library will cause a runtime error: TypeError: Reflect.getMetadata is not a function

import {EventTypeText} from 'event-type-text'
import {EventTypeEvent} from 'event-type-event'
import {SifInteractionElementExpanded} from 'sif-interaction-element-expanded'
import {Type, Exclude} from 'class-transformer/decorators'

export class SifIeEventExpanded extends SifInteractionElementExpanded
{
        constructor()
        {
            super()
            this.event = undefined
            this.event_output_select = undefined
            this.event_output_deselect = undefined
            this.event_label = undefined
        }
// Implementation

        @Type(() => EventTypeEvent)
        event?: EventTypeEvent

        @Type(() => EventTypeEvent)
        event_output_select?: EventTypeEvent

        @Type(() => EventTypeEvent)
        event_output_deselect?: EventTypeEvent
        
        @Type(() => EventTypeText)
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