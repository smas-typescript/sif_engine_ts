/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

import { EventTypeEvent } from 'event-type-event'

export class EventTypeText  extends EventTypeEvent
{
    constructor()
    {
        super()
        this.published = false
        this.text = ""
    }
    // Implementation
        published: boolean

        text: string
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/