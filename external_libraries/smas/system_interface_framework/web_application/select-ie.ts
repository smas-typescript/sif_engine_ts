import {LayerApplicationSif} from 'layer-application-sif'
import {SifIeControlWeb} from 'sif-ie-control-web'
import {SifInteractionElementExpanded} from 'sif-interaction-element-expanded'
import {SifIeTextExpanded} from 'sif-ie-text-expanded'
import {SifIeListExpanded} from 'sif-ie-list-expanded'
import {SifInteractionElement} from 'sif-interaction-element'
import {SifMessageIeExpanded} from 'sif-message-ie-expanded'
import {SifMessageIeListExpanded} from 'sif-message-ie-list-expanded';
import {SifView} from 'sif-view'
import {plainToClass} from 'class-transformer'
import { EventTypeList } from 'event-type-list';

export class SelectIeControlWeb extends SifIeControlWeb
{
    // Creation
    constructor(a_interaction_element: SifInteractionElement, a_html_input_element: HTMLSelectElement, a_current_interacting_view: SifView, a_layer_application_sif: LayerApplicationSif) 
    {
        super(a_interaction_element, a_current_interacting_view, a_layer_application_sif)
        this.element = a_html_input_element

        console.log(this.class_tag + " constructor")
    }
// Json representation 
// for the Message on web socket transmit
    expanded_type(a_id_message: string): SifMessageIeExpanded
    {
        let result: SifMessageIeListExpanded

        result = new SifMessageIeListExpanded(a_id_message, this.interaction_element.identifier, this.current_interacting_view.view_identifier) 
        
        result.handle_events(this.events)

        //If event_input type is defined, then add content of this element into json text

        //Todo: Change to event_list
        //if(result.event_input !== undefined)
        //{
            // result.event_input.list = this.element.value
        //}
        return result
    }
// Parsing
    is_parseable(a_json_object: Object): boolean
    {
        let result: boolean

        result = false
        let ie_list_expanded = plainToClass(SifIeListExpanded, a_json_object)
        if(ie_list_expanded instanceof SifIeListExpanded)
        {
            result = true
            if(ie_list_expanded.event_list instanceof EventTypeList)
            {
                console.log(this.class_tag + "is parseable => " +ie_list_expanded.event_list.list.toString)
            }
            
        }
        return result
    }
// Interaction

    interaction_element_expanded(a_json_object: Object): SifInteractionElementExpanded | undefined
    {
        console.log(this.class_tag + "interaction_element_expanded")
        let result: SifInteractionElementExpanded | undefined

        result = undefined
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
        console.log(this.class_tag + ": handle interaction")
        if(a_interaction_element instanceof SifIeListExpanded)
        {
            if(a_interaction_element.event_list !== undefined && a_interaction_element.event_list.published)
            {
                while(this.element.firstChild)
                {
                    this.element.removeChild(this.element.firstChild)
                }
            
                // let option: HTMLOptionElement
                // for(let list_item in a_interaction_element.event_list.option_list)
                var list_length = a_interaction_element.event_list.list.length
                for(var i = 0; list_length > i; i++)
                {
                    var item = a_interaction_element.event_list.list[i]
                    for(var j = 0; a_interaction_element.event_list.list.length > j; j++)
                    {
                        var option = new Option( item.keys[j], item.values[j], false, false)
                        this.element.add(option)   
                    }
                                               
                }
                console.log(this.class_tag + ": Something different")  
                // this.element.innerHTML = "not finished"//a_interaction_element.event_output.
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

    protected publish_event_input(): void
    {
        console.log(this.class_tag + "publish is called")
        this.events.set("event_input", true)
        this.layer_application_sif.web_interact(this)
        this.reset_events()
    }

    // protected handel_key_up_event(a_event: KeyboardEvent)
    // {
    //     if (a_event.which === 13) // If enter key is pressed, publish the event
    //     {
    //         this.publish_event_input()
    //     }
    // }

    protected element: HTMLSelectElement

    protected do_reset_events(): void
    {
        this.events.set("event_input", false)          
    }

    private class_tag: string ="SelectIe: "
}