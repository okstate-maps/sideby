import React from 'react';
import { useFormik } from 'formik';

export const AddOverlayForm = (props) => {
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

export default AddOverlayForm;