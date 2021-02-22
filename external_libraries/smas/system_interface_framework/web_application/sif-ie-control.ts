/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "System Interface Framework - Web application"
legal: "See notice at end of class."
 */

import {SifInteractionElementExpanded} from 'sif-interaction-element-expanded'
import {SifInteractionElement } from 'sif-interaction-element'
import {SifView} from 'sif-view'

export abstract class SifIeControl
{
        constructor(a_interaction_element: SifInteractionElement, a_current_interacting_view: SifView)
        {
            this.interaction_element = a_interaction_element
            this.current_interacting_view = a_current_interacting_view
        }
    // Parsing
        abstract is_parseable(a_json_object: Object): boolean
            // True, when data_unit is parseable into the correct interaction element
            // Is called upon reception of an interaction element message to publish events

    // Interaction
        abstract interaction_element_expanded(a_json_object: Object): SifInteractionElementExpanded | undefined
            // Result is an expanded interaction element type if the argument can be transformed, meaning is_parseable is true

        abstract handle_interaction(a_interaction_element: SifInteractionElementExpanded): void
            // Execute the published events in the given expanded argument

        interaction_element: SifInteractionElement
    // Implementation
        current_interacting_view: SifView
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/