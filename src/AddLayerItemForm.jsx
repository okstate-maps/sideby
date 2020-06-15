import React from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import TooltipText from './TooltipText';
import TooltipIcon from './TooltipIcon';
import {ConditionalLayerFields, LayerTypeRadioGroup} from './FormComponents';
import {RegexURL} from './Util';
import './FormComponents.css';


export const AddLayerItemForm = (props) => {

  return (
    <Formik
      initialValues={
        {
          url: '',
          layer_type: '',
          display_name: '',
          thumbnail_path: '',
          layers: '',
          format: 'image/jpeg',
          typeNS: '',
          typeName: '',
          geometryField: '',
          maxFeatures: '',
          arcgis: '',
          layer: '',
          tilematrixSet: ''
        }}
      
      validationSchema={Yup.object({
        url: Yup.string()
          .matches(RegexURL, 'Needs to be a valid URL.')
          .required('Required'),
        layer_type: Yup.string()
          .required('Required'),
        display_name: Yup.string()
          .required('Required'),
        thumbnail_path: Yup.string()
      })}

     

      onSubmit={(values, { setSubmitting  }) => {
        props.addLayer(values);
        props.closeModal();
      }}
      
    >

      <Form>
        <h3 className='modalHeader'>
          Add New Layer&nbsp;
          <TooltipIcon tooltipName={TooltipText.AddNewLayer}/>
        </h3>
        <label className='textInputLabel' 
               htmlFor='url'>
            Url&nbsp;
        </label>
        <TooltipIcon tooltipName={TooltipText.LayerUrl}/>
        <div className='inputGroup'>
          <Field as='textarea' name='url' />
        </div>
       
       <LayerTypeRadioGroup name='layer_type' />
       
       <ConditionalLayerFields name='brrr' />
      
        <div className='inputGroup'>
            <label className='textInputLabel' 
                   htmlFor='display_name'>
                Display Name
            </label>
            <Field name='display_name' type='text' />
            <ErrorMessage className='error' 
                          component='div' 
                          name='display_name' />
        </div>

        <div className='inputGroup'>
            <label className='textInputLabel' 
                   htmlFor='thumbnail_path'>
                Thumbnail location (optional)
            </label>
            <Field name='thumbnail_path' type='text' />
            <ErrorMessage className='error' 
                          component='div' 
                          name='thumbnail_path' />
        </div>

        <div className='inputGroup'>
            <label className='textInputLabel' 
                   htmlFor='format'>
                Image Format (optional)
            </label>
            <Field name='format' type='text' />
            <ErrorMessage className='error' 
                          component='div' 
                          name='format' />
        </div>

        <br/>
        <button type='submit'>OK</button>
        <button type='button' onClick={props.closeModal}>Cancel</button>
      </Form>

    </Formik>

  );
};


export default AddLayerItemForm;