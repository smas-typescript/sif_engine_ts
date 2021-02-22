/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "System Interface Framework - Core"
legal: "See notice at end of class."
 */

export class SifInteractionElement 
{
        constructor(a_interaction_element_identifier: number)
        {
            this.identifier = a_interaction_element_identifier
        }

    // Implementation
        identifier: number
            //this identifier is a unique identifier to be able to identify each possible specific interaction
            // it can also be used for sorting purposes
        type: string
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/