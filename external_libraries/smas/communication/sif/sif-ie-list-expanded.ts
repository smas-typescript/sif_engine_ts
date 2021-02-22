/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

import 'reflect-metadata'       // Keep this line first always, else the reflectJS library will cause a runtime error: TypeError: Reflect.getMetadata is not a function

import {EventTypeList} from 'event-type-list'
import {EventTypeEvent} from 'event-type-event'
import {SifInteractionElementExpanded} from 'sif-interaction-element-expanded'
import {Type, Exclude} from 'class-transformer/decorators'

export class SifIeListExpanded extends SifInteractionElementExpanded
{
        constructor()
        {
            super()
            this.event_list = undefined
        }
// Implementation

        @Type(() => EventTypeEvent)
        event_list?: EventTypeList

}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/