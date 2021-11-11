import React from 'react';
import { Field, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { guessLayerTypeByUrl } from './Helpers';
import {RegexURL, findWithAttr} from './Util';
import TooltipText from './TooltipText';
import TooltipIcon from './TooltipIcon';

export const ConditionalLayerFields = (props) => {
    
    const layerTypeFields = {
        WFSLayer: ['typeNS', 'typeName', 'geometryField', 'maxFeatures', 'arcgis'],
        WMSTileLayer: ['layers'],
        WMTSTileLayer: ['layer', 'tilematrixSet']
      }
    
    const { values } = useFormikContext();
    let layer_type = values.layer_type;
    let layer_fields = layerTypeFields[layer_type];
    
    if (!layer_type || !layer_fields) {return null}

    return (
      <div className='conditionalLayerFields'>
      <h4 className='conditionalLayerFieldsHeader'>
        {layer_type}: Additional Field{layer_fields.length > 1 ? 's' : ''}
      </h4>
      <div>
        <>
          {layer_fields.map(function(field_name) {
            return (
              <div key={layer_type+'_'+field_name} 
                   className='conditionalLayerField inputGroup'>
                <label className='textInputLabel' htmlFor={field_name}>
                    {field_name}&nbsp;
                    <Field name={field_name} type="text"/>
                </label>
              </div>
            )
          })}
        </>
      </div>
      </div>

    ) 
}

export const LayerTypeRadioGroup = props => {
 const {
    values: {url},
    touched,
    setFieldValue,
  } = useFormikContext();

  //const [field, meta] = useField(props);

  React.useEffect(() => {
    let newType = guessLayerTypeByUrl(url);
    setFieldValue(props.name, newType);
    
  }, [url, touched.url, setFieldValue, props.name]);

  return (
    <div className='radioGroup'>
          <label className='radioGroupLabel'>Type of Layer</label>

          <div className='inputGroup'>
            <Field id='typeTileLayer'
                   name='layer_type'
                   type='radio'
                   value='TileLayer'/>
            <label className='radioGroupLabel' 
                   htmlFor='typeTileLayer'>
                XYZ Tile Layer
            </label>
            <TooltipIcon tooltipName={TooltipText.TileLayer}/>
          </div>

          <div className='inputGroup'>
            <Field id='typeWFSLayer' 
                   name='layer_type' 
                   type='radio' 
                   value='WFSLayer'/>
            <label className='radioGroupLabel' 
                   htmlFor='typeWFSLayer'>
                WFS Layer
            </label>
            <TooltipIcon tooltipName={TooltipText.WFSLayer}/>
          </div>

          <div className='inputGroup'>
            <Field id='typeWMSTileLayer' 
                   name='layer_type' 
                   type='radio' 
                   value='WMSTileLayer'/>
            <label className='radioGroupLabel' 
                   htmlFor='typeWMSTileLayer'>
                WMS Layer
            </label>
            <TooltipIcon tooltipName={TooltipText.WMSTileLayer}/>
          </div>

          <div className='inputGroup'>
            <Field id='typeWMTSTileLayer'
                   name='layer_type'
                   type='radio'
                   value='WMTSTileLayer'/>
            <label className='radioGroupLabel' 
                   htmlFor='typeWMTSTileLayer'>
                WMTS Tile Layer
            </label>
            <TooltipIcon tooltipName={TooltipText.WMTSTileLayer}/>
          </div>

          <div className='inputGroup'>
            <Field id='typeEsriTiledMapLayer'
                   name='layer_type'
                   type='radio'
                   value='EsriTiledMapLayer'/>
            <label className='radioGroupLabel' 
                   htmlFor='typeEsriTiledMapLayer'>
                Esri Tiled Map Layer
            </label>
            <TooltipIcon tooltipName={TooltipText.EsriTiledMapLayer}/>
          </div>

          <div className='inputGroup'>
            <Field id='typeEsriDynamicMapLayer'
                   name='layer_type'
                   type='radio'
                   value='EsriDynamicMapLayer'/>
            <label className='radioGroupLabel' 
                   htmlFor='typeEsriDynamicMapLayer'>
                Esri Dynamic Map Layer
            </label>
            <TooltipIcon tooltipName={TooltipText.EsriDynamicMapLayer}/>
          </div>

          <div className='inputGroup'>
            <Field id='typeEsriFeatureLayer'
                   name='layer_type'
                   type='radio'
                   value='EsriFeatureLayer'/>
            <label className='radioGroupLabel'
                   htmlFor='typeEsriFeatureLayer'>
                Esri Feature Layer
            </label>
            <TooltipIcon tooltipName={TooltipText.EsriFeatureLayer}/>
          </div>
          
          <div className='inputGroup'>
            <Field id='typeEsriImageLayer'
                   name='layer_type'
                   type='radio'
                   value='EsriImageLayer'/>
            <label className='radioGroupLabel'
                   htmlFor='typeEsriImageLayer'>
                Esri Image Layer
            </label>
            <TooltipIcon tooltipName={TooltipText.EsriImageLayer}/>
          </div>

          <div className='inputGroup'>
            <Field id='typeEsriVectorTileLayer'
                   name='layer_type'
                   type='radio'
                   value='EsriVectorTileLayer'/>
            <label className='radioGroupLabel'
                   htmlFor='typeEsriVectorTileLayer'>
                Esri Vector Tile Layer
            </label>
            <TooltipIcon tooltipName={TooltipText.EsriVectorTileLayer}/>
          </div>
        </div>
  )
}




function BasemapList(props) {
  const opts = props.basemapOptions;
  const basemapList = opts.map((item) => 
    <div key={item.name} className='inputGroup verticalInputGroup'>
        <label className='radioGroupLabel basemapLabel' 
          htmlFor={item.name}
          key={item.name}>
          <img src={item.thumbnail_path}></img>
          {item.display_name}       
        </label>

        <Field id={item.name}
            name='name'
            className='hiddenRadio'
            type='radio'
            value={item.name}/>
  
        
    </div>
  );
  return basemapList;
}

export const BasemapRadioGroup = props => {
  const {
     values: {style},
     touched,
     setFieldValue,
   } = useFormikContext();
 
   console.log(props);
   //const [field, meta] = useField(props);
 
   
   React.useEffect(() => {
     //let newType = guessLayerTypeByUrl(url);
     //setFieldValue(props.name, newType);
     
   }, [style, touched.style, setFieldValue, props.name]);
 
   return (
     <div className='radioGroup'>
           <label className='radioGroupLabel'>Type</label>
 
           <div className='inputGroup verticalInputGroup'>
              <BasemapList basemapOptions={props.options}/>
           </div>
      </div>
   )
 }

export const AddBasemapInitialValues = {
  style:'',
  display_name: '',
  thumbnail_path: '',
  layer_type: 'EsriVectorBasemapLayer',
  apikey: window.sideby.Config.esriAPIKey

};

export const AddLayerInitialValues = {
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
};

export const AddLayerValidationSchema = Yup.object({
    url: Yup.string()
      .matches(RegexURL, 'Needs to be a valid URL.')
      .required('Required'),
    layer_type: Yup.string()
      .required('Required'),
    display_name: Yup.string()
      .required('Required'),
    thumbnail_path: Yup.string(),
    layers: Yup.string(),
    format: Yup.string(),
    typeNS: Yup.string(),
    typeName: Yup.string(),
    geometryField: Yup.string(),
    maxFeatures: Yup.string(),
    arcgis: Yup.boolean(),
    layer: Yup.string(),
    tilematrixSet: Yup.string(),
    is_basemap: Yup.boolean()
});

export default LayerTypeRadioGroup;