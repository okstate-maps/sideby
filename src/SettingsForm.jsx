import React from 'react';
import ExportLayersToJSONButton from './ExportLayersToJSONButton';
import MapLabelsToggle from './MapLabelsToggle';
import { useFormik } from 'formik';

export const SettingsForm = (props) => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      mapLabels: true
    },
    onSubmit: values => {
        props.closeModal();
    },
    onChange: v => {alert(v)}
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <MapLabelsToggle labelLayerOn={props.labelLayerOn}
          toggleLabels={props.toggleLabels} />
      <ExportLayersToJSONButton layers={props.viewbarLayers} />
      <button type="submit">OK</button>
    </form>
  );
};

export default SettingsForm