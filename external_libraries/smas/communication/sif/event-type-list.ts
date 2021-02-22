/*
author: ""
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
description: "The properties in this class is to match sif interaction element sif_ie_list for the single selection and multipul selection"
 */

import { EventTypeEvent } from 'event-type-event'


export class EventTypeList  extends EventTypeEvent
{
    constructor()
    {
        super()
        // this.published = false
        this.list = new Array<Array<string>>()
        this.selections = new Array<number>()
    }
    // Implementation
        // published: boolean
        events: Map<string, boolean>       //Can be moved to parent class.  For now it is not used.
        list: Array<Array<string>>
        selections: Array<number>
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/