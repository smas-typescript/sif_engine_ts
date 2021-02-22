/*
author: "Paul Gokke"
date: "$Date$"
revision: "$Revision$"
library: "System Interface Framework - Web application"
legal: "See notice at end of class."
 */

import {ButtonIe} from 'button-ie'
import {LayerApplicationSif} from 'layer-application-sif'
import {SifIeControl} from "sif-ie-control"
import {SifInteractionElement} from 'sif-interaction-element'
import {SifView} from 'sif-view'
import {TextAreaIe} from 'text-area-ie'
import {ParagraphIe} from 'paragraph-ie'
import {InputIe} from 'input-ie'
import {TextIe} from 'text-ie'
import { SelectIeControlWeb } from 'select-ie-control';

export class FactorySifIeControl
{
        private static _instance:FactorySifIeControl

        public static getInstance(): FactorySifIeControl
        {
                return FactorySifIeControl._instance || (FactorySifIeControl._instance = new FactorySifIeControl())
        }
        
        create_ie_button(a_interaction_element:SifInteractionElement, a_html_button_element: HTMLButtonElement, a_view:SifView, a_layer_application_sif: LayerApplicationSif): ButtonIe
        {
            return new ButtonIe(a_interaction_element, a_html_button_element, a_view, a_layer_application_sif)
        }
        create_ie_textarea(a_interaction_element:SifInteractionElement, a_html_textarea_element: HTMLTextAreaElement, a_view:SifView, a_layer_application_sif: LayerApplicationSif): TextAreaIe
        {
            return new TextAreaIe(a_interaction_element, a_html_textarea_element, a_view, a_layer_application_sif)
        }
        create_ie_paragraph(a_interaction_element:SifInteractionElement, a_html_paragraph_element: HTMLParagraphElement, a_view:SifView, a_layer_application_sif: LayerApplicationSif): ParagraphIe
        {
            return new ParagraphIe(a_interaction_element, a_html_paragraph_element, a_view, a_layer_application_sif)
        }
        create_ie_input(a_interaction_element:SifInteractionElement, a_html_input_element: HTMLInputElement, a_view:SifView, a_layer_application_sif: LayerApplicationSif): InputIe
        {
            return new InputIe(a_interaction_element, a_html_input_element, a_view, a_layer_application_sif)
        }
        create_ie_text_control(a_interaction_element:SifInteractionElement, a_html_text_element: HTMLElement, a_view:SifView, a_layer_application_sif: LayerApplicationSif): TextIe
        {
            return new TextIe(a_interaction_element, a_html_text_element, a_view, a_layer_application_sif)
        }
        create_ie_select_control(a_interaction_element:SifInteractionElement, a_html_select_element: HTMLSelectElement, a_view:SifView, a_layer_application_sif: LayerApplicationSif): SelectIeControlWeb
        {
            return new SelectIeControlWeb(a_interaction_element, a_html_select_element, a_view, a_layer_application_sif)
        }
}

/*! copyright: "Copyright (c) 2017-2017, SMA Services" */
/*
license:   "Eiffel Forum License v2 (see http://www.eiffel.com/licensing/forum.txt)"
source: "[
        SMA Services
        Website: http://www.sma-services.com
    ]" 
*/