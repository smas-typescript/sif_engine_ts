/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "Communication - General"
legal: "See notice at end of class."
 */

export abstract class Layer 
{
    // Status
        is_connected(): boolean 
        {
            let l_result: boolean = false

            if (this.lower_layer !== undefined )
            {
                l_result = this.lower_layer.is_connected()
            }
            return l_result
        };

    // Communication
        transmit(a_data_unit: string): void
        {
            if (this.lower_layer !== undefined )
            {
                this.lower_layer.transmit(a_data_unit)
            }
        }

        receive(a_data_unit: string): void
        {
            if (this.higher_layer !== undefined )
            {
                this.higher_layer.receive(a_data_unit)
            }
        }

    // Element Change
        set_lower_layer(a_lower_layer: Layer): void 
                // Make a_lower_layer the new lower layer of this layer
        {
            this.lower_layer = a_lower_layer
        }

        set_higher_layer(a_higher_layer: Layer): void 
                // Make a_higher_layer the new higher layer of this layer
        {
            this.higher_layer = a_higher_layer
        }

    // OSI Layers Model
        higher_layer?: Layer

        lower_layer?: Layer
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/