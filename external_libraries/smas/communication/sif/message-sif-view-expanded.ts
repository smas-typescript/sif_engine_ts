/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - SIF (System Interface Framework)"
legal: "See notice at end of class."
 */

import {EnumerationViewAction} from 'enumeration-view-action'
import {SifInteractionElement} from 'sif-interaction-element'
import {Type, Exclude} from 'class-transformer/decorators'

export class MessageSifViewExpanded
    // This class is to be used for json to class conversions
    // While the nature of the sif based on websocket is communication of sif messages
    // is formatted in JSON, this and derived classes are used as an intermediary
    // Mostly due to the fact that reflection mechanisms in TypeScript currently do not work good enough.
    {
        constructor()
        {
            this.id_message = ""
            this.action = EnumerationViewAction.Hide
            this.view_identifier = 0
            this.html = ""
        }
    // Implementation
        id_message: string

        action: EnumerationViewAction

        @Type(() => Number)
        view_identifier: number

        @Type(() => SifInteractionElement)
        interaction_elements: Array<SifInteractionElement>

        html: string
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/