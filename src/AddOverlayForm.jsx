import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TooltipText from './TooltipText';
import TooltipIcon from './TooltipIcon';
import {ConditionalLayerFields, LayerTypeRadioGroup,
        AddLayerInitialValues, AddLayerValidationSchema} from './FormComponents';
import './FormComponents.css';

export const AddOverlayForm = (props) => {
  return (
    <Formik
      initialValues={AddLayerInitialValues}
      
      validationSchema={AddLayerValidationSchema}

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