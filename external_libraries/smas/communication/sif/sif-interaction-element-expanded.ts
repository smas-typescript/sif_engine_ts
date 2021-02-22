/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

import 'reflect-metadata'       // Keep this line first always, else the reflectJS library will cause a runtime error: TypeError: Reflect.getMetadata is not a function

import {EventTypeEvent} from 'event-type-event'
import {Type, Exclude} from 'class-transformer/decorators'

export class SifInteractionElementExpanded
    // This class is to be used for json to class conversions
    // While the nature of the sif based on websocket is communication of sif messages
    // is formatted in JSON, this and derived classes are used as an intermediary
    // Mostly due to the fact that reflection mechanisms in TypeScript currently do not work good enough.
    {
        constructor()
        {
            this.identifier = 0
            this.type = ""
            this.event_visible = undefined
            this.event_unvisible = undefined
            this.event_enable = undefined
            this.event_disable = undefined
        }
    // Implementation
        identifier: number

        type: string

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