import React from 'react';
import Streets from './images/basemap_thumbs/street_thumb_b2wm.jpg';
import Topographic from './images/basemap_thumbs/topo_thumb_b2wm.jpg';
import Navigation from './images/basemap_thumbs/navigation_thumb_b2.jpg';
import Streets_Night from './images/basemap_thumbs/streetnight_thumb_b2.jpg';
import Terrain from './images/basemap_thumbs/Terrain_Labels_Web_map.jpg';
import Light_Gray_Canvas from './images/basemap_thumbs/lightgray_thumb_b2wm.jpg';
import Dark_Gray_Canvas from './images/basemap_thumbs/darkgray_thumb_b2wm.jpg';
import Oceans from './images/basemap_thumbs/thumbnail1541180692006.jpeg';
import OpenStreetMap from './images/basemap_thumbs/thumbnail1547740877120.jpeg';
import Charted_Territory_Map from './images/basemap_thumbs/ChartedTerritory_T2_600x400_thumb.jpg';
import Community_Map from './images/basemap_thumbs/thumbnail1561649662036.jpeg';
import Navigation_Dark_Mode from './images/basemap_thumbs/T2_NavDark_600x400_thumb.jpg';
import Newspaper_Map from './images/basemap_thumbs/thumbnail1563382193586.jpeg';
import Modern_Antique from './images/basemap_thumbs/thumbnail1584383047375.jpeg';
import MidCentury from './images/basemap_thumbs/thumbnail1563382006810.jpeg';
import Nova from './images/basemap_thumbs/thumbnail1580490916023.jpeg';
import Colored_Pencil from './images/basemap_thumbs/thumbnail1580490854424.jpeg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TooltipText from './TooltipText';
import TooltipIcon from './TooltipIcon';
import { findWithAttr } from './Util';
import {ConditionalLayerFields, BasemapRadioGroup,
        AddLayerInitialValues, AddLayerValidationSchema, AddBasemapInitialValues} from './FormComponents';
import './FormComponents.css';

//id,name,thumb_url
const basemapOptions = [
  {name:'ArcGIS:StreetsRelief:Base',
   display_name:'Streets', 
  thumbnail_path:Streets},
 { name:'ArcGIS:Topographic:Base',
  display_name:'Topographic', 
  thumbnail_path: Topographic},
 { name:'ArcGIS:Navigation',
  display_name:'Navigation', 
  thumbnail_path: Navigation},
 { name:'ArcGIS:StreetsNight',
  display_name:'Streets Night', 
  thumbnail_path: Streets_Night},
 { name:'ArcGIS:Terrain:Base',
  display_name:'Terrain', 
  thumbnail_path:Terrain},
 { name:'ArcGIS:LightGray',
  display_name:'Light Gray Canvas', 
  thumbnail_path: Light_Gray_Canvas},
 { name:'ArcGIS:DarkGray',
  display_name:'Dark Gray Canvas', 
  thumbnail_path: Dark_Gray_Canvas},
 { name:'ArcGIS:Oceans',
  display_name:'Oceans', 
  thumbnail_path: Oceans},
 { name:'OSM:Standard',
  display_name:'OpenStreetMap', 
  thumbnail_path: OpenStreetMap},
 { name:'ArcGIS:ChartedTerritory',
  display_name:'Charted Territory', 
  thumbnail_path: Charted_Territory_Map},
 { name:'ArcGIS:Community',
  display_name:'Community Map', 
  thumbnail_path: Community_Map},
 { name:'ArcGIS:NavigationNight',
  display_name:'Navigation Dark Mode', 
  thumbnail_path: Navigation_Dark_Mode},
 { name:'ArcGIS:Newspaper',
  display_name:'Newspaper', 
  thumbnail_path: Newspaper_Map},
 { name:'ArcGIS:ModernAntique',
  display_name:'Modern Antique', 
  thumbnail_path: Modern_Antique},
 { name:'ArcGIS:Midcentury',
  display_name:'MidCentury', 
  thumbnail_path: MidCentury},
 { name:'ArcGIS:Nova',
  display_name:'Nova', 
  thumbnail_path: Nova},
 { name:'ArcGIS:ColoredPencil',
  display_name:'Colored Pencil', 
  thumbnail_path: Colored_Pencil},
];

export const BasemapGalleryForm = (props) => {

  return (
    <Formik
      initialValues={AddBasemapInitialValues}
      onSubmit={(values, { setSubmitting  }) => {
        values.display_name = basemapOptions[findWithAttr(basemapOptions, 'name', values.name)]['display_name'];
        values.thumbnail_path = basemapOptions[findWithAttr(basemapOptions, 'name', values.name)]['thumbnail_path'];
        console.log(values);
        props.addLayer(values);
        props.closeModal();
      }}
    >

      <Form>
        <h3 className='modalHeader'>
          Add Basemap&nbsp;
          <TooltipIcon tooltipName={TooltipText.AddBasemap}/>
        </h3>
        
       <BasemapRadioGroup name='basemap' options={basemapOptions} />
       
       <ConditionalLayerFields name='brrr' />
        <br/>
        <button type='submit'>OK</button>
        <button type='button' onClick={props.closeModal}>Cancel</button>
      </Form>

    </Formik>

  );
};


export default BasemapGalleryForm;