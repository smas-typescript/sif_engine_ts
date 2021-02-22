import {LayerApplicationSif} from 'layer-application-sif'
import {SifIeControlWeb} from 'sif-ie-control-web'
import {SifInteractionElementExpanded} from 'sif-interaction-element-expanded'
import {SifIeTextExpanded} from 'sif-ie-text-expanded'
import {SifInteractionElement} from 'sif-interaction-element'
import {SifMessageIeExpanded} from 'sif-message-ie-expanded'
import { SifMessageIeListExpanded } from 'sif-message-ie-list-expanded'
import {SifView} from 'sif-view'
import {plainToClass} from 'class-transformer'
import { SifIeListExpanded } from 'sif-ie-list-expanded'
import { EventTypeEvent } from 'event-type-event';

export class SelectIeControlWeb extends SifIeControlWeb
{
    // Creation
    constructor(a_interaction_element: SifInteractionElement, a_html_input_element: HTMLSelectElement, a_current_interacting_view: SifView, a_layer_application_sif: LayerApplicationSif) 
    {
        super(a_interaction_element, a_current_interacting_view, a_layer_application_sif)
        this.element = a_html_input_element
        this.element.addEventListener('change', event => this.publish_event_list_selected(event))
        console.log(this.class_tag + " constructor")
    }
// Json representation 
// for the Message on web socket transmit
    expanded_type(a_id_message: string): SifMessageIeExpanded
    {
        let result: SifMessageIeListExpanded

        result = new SifMessageIeListExpanded(a_id_message, this.interaction_element.identifier, this.current_interacting_view.view_identifier) 
        
        result.handle_events(this.events)  //general handle events in SifMessageIeExpanded

        if(result.event_input_selection !== undefined)
        { 
            for(let i = 0; i < this.element.selectedOptions.length; i ++)
            {   
                result.event_input_selection.selections.push(this.element.selectedOptions[i].index)
            }
        }
        return result
    }
// Parsing
    is_parseable(a_json_object: Object): boolean
    {
        let result: boolean = false
        let ie_list_expanded = plainToClass(SifIeListExpanded, a_json_object)
        if(ie_list_expanded instanceof SifIeListExpanded)
        {
            if(ie_list_expanded.event_list instanceof EventTypeEvent)
                result = true            
        }
        return result
    }
// Interaction
    interaction_element_expanded(a_json_object: Object): SifInteractionElementExpanded | undefined
    {
        console.log(this.class_tag + "interaction_element_expanded")
        let result: SifInteractionElementExpanded | undefined

        let ie_list_expanded = plainToClass(SifIeListExpanded, a_json_object)
        if(ie_list_expanded instanceof SifIeListExpanded)
        {
            result = ie_list_expanded
        }
        return result
    }
    do_handle_interaction(a_interaction_element: SifInteractionElementExpanded): void
    {
        debugger
        console.log(this.class_tag + ": handle interection")
        if(a_interaction_element instanceof SifIeListExpanded)
        {
            if(a_interaction_element.event_list !== undefined && a_interaction_element.event_list.published)
            {
                // remove existing options
                while(this.element.firstChild)
                {
                    this.element.removeChild(this.element.firstChild)
                }
            
                // add new options into the select element
                let list_length = a_interaction_element.event_list.list.length
                for(let i = 0; i < list_length; i++)
                {
                    let item = a_interaction_element.event_list.list[i]
                    let option_string = ''
                    for(let j = 0; j < item.length; j++)
                    {
                        option_string = option_string + item[j] + ' '
                    }
                    let option = new Option(option_string, String(i), false, false)
                    this.element.add(option)
                }
            }
            if(a_interaction_element.event_disable !== undefined && a_interaction_element.event_disable.published)
            {
                this.element.disabled = true
            }
            if(a_interaction_element.event_enable !== undefined && a_interaction_element.event_enable.published)
            {
                this.element.disabled = false
            }
        }
    }

// Implementation
    protected to_json_extended(a_json_object: Object): void
    {
        console.log(this.class_tag + "to json extended")
    }

    protected publish_event_list_selected(a_event: Event): void
    {
        console.log(this.class_tag + "publish is called")
        this.events.set("event_input_selection", true)
        this.layer_application_sif.web_interact(this)
        this.reset_events()
    }

    protected element: HTMLSelectElement

    protected do_reset_events(): void
    {
        this.events.set("event_list_selected", false)          
    }

    private class_tag: string ="SelectIe: "
}