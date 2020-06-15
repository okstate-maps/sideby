import React from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import TooltipText from './TooltipText';
import TooltipIcon from './TooltipIcon';
import {ConditionalLayerFields, LayerTypeRadioGroup} from './FormComponents';
import {RegexURL} from './Util';
import './FormComponents.css';

export const AddOverlayForm = (props) => {
  return (
    <Formik
      initialValues={
        {
          url: '',
          layer_type: '',
          display_name: '',
          is_basemap: false,
          layers: '',
          typeNS: '',
          typeName: '',
          arcgis: false
        }}
      
      validationSchema={Yup.object({
        url: Yup.string()
          .matches(RegexURL, 'Needs to be a valid URL.')
          .required('Required'), 
        layer_type: Yup.string()
          .required('Required'),
        display_name: Yup.string()
          .required('Required'),
        is_basemap: Yup.boolean()
          .default(false)
      })}

      onSubmit={(values, { setSubmitting  }) => {
        props.addOverlay(values);
        props.closeModal();
      }}

    >

      <Form>
      <h3 className='modalHeader'>Add New Overlay</h3>
        <label className='textInputLabel' htmlFor='url'>Url&nbsp;</label>
        <TooltipIcon tooltipName={TooltipText.LayerUrl}/>

        <div className='inputGroup'>
          <Field as='textarea' name='url' />
          <ErrorMessage className='error' component='div' name='url' />
        </div>

        <LayerTypeRadioGroup name='layer_type' />
   
        <ConditionalLayerFields />
        
        <div className='inputGroup'>
            <label className='textInputLabel' htmlFor='display_name'>Display Name</label>
            <Field name='display_name' type='text' />
            <ErrorMessage className='error' component='div' name='display_name' />
        </div>

        
        <div className='inputGroup'>
          <Field id='is_basemap' name='is_basemap' type='checkbox' />
          <label className='radioGroupLabel' htmlFor='is_basemap'>Place layer beneath others rather than on top.</label>
        </div>

        <button type='submit'>OK</button>
        <button type='button' onClick={props.closeModal}>Cancel</button>
      </Form>
    </Formik>
  );
};

export default AddOverlayForm;