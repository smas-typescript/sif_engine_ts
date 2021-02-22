/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "System Interface Framework - Web application"
legal: "See notice at end of class."
 */

import {SifView} from 'sif-view'

export class SifSystemInterfaceViewable
{
        constructor()
        {
            this.active_views = new Map()
        }

    // Implementation
        active_views: Map<Number, SifView>
            // All currently active views
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/