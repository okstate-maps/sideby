import React from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import TooltipText from './TooltipText';
import TooltipIcon from './TooltipIcon';
import Textarea from './Textarea';
import './Textarea.css';


export const AddOverlayForm = (props) => {
  return (
    <Formik
      initialValues={
        {
          url: '',
          type: '',
          display_name: ''
        }}
      
      validationSchema={Yup.object({
        url: Yup.string()
          .url('Needs to be a valid URL.')
          .required('Required'),
        type: Yup.string(),
        display_name: Yup.string()
          .required('Required')
      })}

      onSubmit={(values, { setSubmitting  }) => {
        props.addOverlay(values);
        props.closeModal();
      }}

    >

      <Form>
      <h3 className="modalHeader">Add New Overlay</h3>
        <label className='textInputLabel' htmlFor='url'>Url&nbsp;</label>
        <TooltipIcon tooltipName={TooltipText.LayerUrl}/>
        <Textarea name='url' />

        <div className='radioGroup'>
          <label className='radioGroupLabel'>Type of Layer</label>
          <div className='inputGroup'>
            <Field id='typeTileLayer' name='type' type='radio' value="TileLayer"/>
            <label className='radioGroupLabel' htmlFor='typeTileLayer'>TileLayer</label>
            <TooltipIcon tooltipName={TooltipText.TileLayer}/>
          </div>
          <div className='inputGroup'>
            <Field id='typeWMSTileLayer' name='type' type='radio' value="WMSTileLayer"/>
            <label className='radioGroupLabel' htmlFor='typeWMSTileLayer'>WMSTileLayer</label>
            <TooltipIcon tooltipName={TooltipText.WMSTileLayer}/>
          </div>
          <div className='inputGroup'>
            <Field id='typeEsriTiledMapLayer' name='type' type='radio' value="EsriTiledMapLayer"/>
            <label className='radioGroupLabel' htmlFor='typeEsriTiledMapLayer'>EsriTiledMapLayer</label>
            <TooltipIcon tooltipName={TooltipText.EsriTiledMapLayer}/>
          </div>
          <div className='inputGroup'>
            <Field id='typeEsriDynamicMapLayer' name='type' type='radio' value="EsriDynamicMapLayer"/>
            <label className='radioGroupLabel' htmlFor='typeEsriDynamicMapLayer'>EsriDynamicMapLayer</label>
            <TooltipIcon tooltipName={TooltipText.EsriDynamicMapLayer}/>
          </div>
          <div className='inputGroup'>
            <Field id='typeEsriFeatureLayer' name='type' type='radio' value="EsriFeatureLayer"/>
            <label className='radioGroupLabel' htmlFor='typeEsriFeatureLayer'>EsriFeatureLayer</label>
            <TooltipIcon tooltipName={TooltipText.EsriFeatureLayer}/>
          </div>
          

        </div>

        <div className='inputGroup'>
            <label className='textInputLabel' htmlFor='display_name'>Display Name</label>
            <Field name='display_name' type='text' />
            <ErrorMessage className='error' component='div' name='display_name' />
        </div>

        <br/>
        <button type="submit">OK</button>
        <button type="button" onClick={props.closeModal}>Cancel</button>
      </Form>

    </Formik>

  );
};


export default AddOverlayForm;