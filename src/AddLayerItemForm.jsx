import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TooltipText from './TooltipText';
import TooltipIcon from './TooltipIcon';
import {LayerUrlField, LayerTypeRadioGroup} from './Textarea';
import {RegexURL} from './Util';
import './Textarea.css';



export const AddLayerItemForm = (props) => {

  return (
    <Formik
      initialValues={
        {
          url: '',
          type: '',
          display_name: '',
          thumbnail_path: ''
        }}
      
      validationSchema={Yup.object({
        url: Yup.string()
          .matches(RegexURL, 'Needs to be a valid URL.')
          .required('Required'),
        type: Yup.string()
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
        <h3 className="modalHeader">Add New Layer <TooltipIcon tooltipName={TooltipText.AddNewLayer}/></h3>
        <label className='textInputLabel' htmlFor='url'>Url&nbsp;</label>
        <TooltipIcon tooltipName={TooltipText.LayerUrl}/>
        <div className='inputGroup'>
          <Field as='textarea' name='url' />
        </div>
       <LayerTypeRadioGroup name='type' />
        <div className='inputGroup'>
            <label className='textInputLabel' htmlFor='display_name'>Display Name</label>
            <Field name='display_name' type='text' />
            <ErrorMessage className='error' component='div' name='display_name' />
        </div>

        <div className='inputGroup'>
            <label className='textInputLabel' htmlFor='thumbnail_path'>Thumbnail location (optional)</label>
            <Field name='thumbnail_path' type='text' />
            <ErrorMessage className='error' component='div' name='thumbnail_path' />
        </div>

        <br/>
        <button type="submit">OK</button>
        <button type="button" onClick={props.closeModal}>Cancel</button>
      </Form>

    </Formik>

  );
};


export default AddLayerItemForm;