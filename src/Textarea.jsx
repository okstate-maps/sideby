import React from 'react';
import { Formik, Field, Form, useField, useFormikContext } from 'formik';
import TooltipText from './TooltipText';
import TooltipIcon from './TooltipIcon';

export const LayerTypeRadioGroup = props => {
 const {
    values: {url},
    touched,
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    // set the value of textC, based on textA and textB
    let typeREs = {
        TileLayer: /.*\{z\}.*\{x\}.*\{y\}.*/,
        WMSTileLayer: /.*wms.*/i,
        WMTSTileLayer: /.*wmts.*/i,
        EsriImageLayer: /.*ImageServer.*/,
        EsriFeatureLayer: /.*FeatureServer.*/, //though an individ layer from esri dynam map service can also act as a feature layer...
        EsriTiledMapLayer: /.*MapServer.*/, 
    };
    let submittedUrl = url;
    let newType = null;
    
    Object.entries(typeREs).forEach((lyrTypeRE) => {
            if (lyrTypeRE[1].test(submittedUrl)) {
                newType = lyrTypeRE[0];
            }
        }
    )
    console.log(props); 
    setFieldValue(props.name, newType);
    
  }, [url, touched.url, setFieldValue, props.name]);

  return (
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
            <Field id='typeWMTSTileLayer' name='type' type='radio' value="WMTSTileLayer"/>
            <label className='radioGroupLabel' htmlFor='typeWMTSTileLayer'>WMTSTileLayer</label>
            <TooltipIcon tooltipName={TooltipText.WMTSTileLayer}/>
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
          

          <div className='inputGroup'>
            <Field id='typeEsriImageLayer' name='type' type='radio' value="EsriImageLayer"/>
            <label className='radioGroupLabel' htmlFor='typeEsriImageLayer'>EsriImageLayer</label>
            <TooltipIcon tooltipName={TooltipText.EsriImageLayer}/>
          </div>

        </div>

      )



}




export const LayerUrlField = props => {
  const {
    values,
    touched,
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    // set the value of textC, based on textA and textB
    let typeREs = {
        TileLayer: /.*\{z\}.*\{x\}.*\{y\}.*/,
        WMSTileLayer: /.*wms.*/i,
        WMTSTileLayer: /.*wmts.*/i,
        EsriImageLayer: /.*ImageServer.*/,
        EsriFeatureLayer: /.*FeatureServer.*/, //though an individ layer from esri dynam map service can also act as a feature layer...
        EsriTiledMapLayer: /.*MapServer.*/, 
    };
    let submittedUrl = values.url;
    let newType = null;
    
    Object.entries(typeREs).forEach((lyrTypeRE) => {
            if (lyrTypeRE[1].test(submittedUrl)) {
                newType = lyrTypeRE[0];
            }
        }
    )
    console.log(props); 
    setFieldValue(values.type, newType);
    
  }, [values.url, touched.url, setFieldValue, values.type]);

  return (
    <>
      <textarea {...props} {...field} />
      {!!meta.touched && !!meta.error && <div className='error'>{meta.error}</div>}
    </>
  );
};

export const Textarea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta, helpers] = useField(props);
  return (
    <>
     <div className="inputGroup">
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="textarea" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
     </div>
    </>
  );
};

export default LayerUrlField;