import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TooltipText from './TooltipText';
import TooltipIcon from './TooltipIcon';
import {LayerTypeRadioGroup} from './FormComponents';
import {RegexURL} from './Util';
import './FormComponents.css';


export const AddOverlayForm = (props) => {
  return (
    <Formik
      initialValues={
        {
          url: '',
          type: '',
          display_name: '',
          is_basemap: false
        }}
      
      validationSchema={Yup.object({
        url: Yup.string()
          .matches(RegexURL, 'Needs to be a valid URL.')
          .required('Required'), 
        type: Yup.string()
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

        <LayerTypeRadioGroup name='type' />

        <div className='inputGroup'>
            <label className='textInputLabel' htmlFor='display_name'>Display Name</label>
            <Field name='display_name' type='text' />
            <ErrorMessage className='error' component='div' name='display_name' />
        </div>
        
        <div className='inputGroup'>
          <Field id='is_basemap' name='is_basemap' type='checkbox' />
          <label className='radioGroupLabel' htmlFor='is_basemap'>Treat this layer as a basemap rather than an overlay.</label>
        </div>

        <button type='submit'>OK</button>
        <button type='button' onClick={props.closeModal}>Cancel</button>
      </Form>
    </Formik>
  );
};

export default AddOverlayForm;