import { useState, useEffect } from 'react';
import createDOMPurify from 'dompurify';
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function useForm(callBack, validate, article, consent, setConsent) {
  const [initialFormValues, setInitialFormValues] = useState({});
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  // test wether submitted
  const [isSubmit, setIsSubmit] = useState(false);

  function init() {
    if (article) {
      setValues({
        name: article.name,
        postTitle: article.postTitle,
        postBody: article.postBody,
      });
      setIsEdit(true);
      setInitialFormValues({
        name: article.name,
        postTitle: article.postTitle,
        postBody: article.postBody,
      });
    } else {
      setValues({
        name: '',
        postTitle: '',
        postBody: '',
      });
      setIsEdit(false);
      setInitialFormValues({
        name: '',
        postTitle: '',
        postBody: '',
      });
    }
  }

  // this will run if user press save and there is no errors
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log('submitted successfully');
      callBack(isEdit);
    }
  }, [errors]);

  //
  useEffect(() => {
    init();
  }, []);

  //

  // Cancel function
  const handleCancel = e => {
    e.preventDefault();
    setValues(initialFormValues);
    setIsSubmit(false);
  };

  // save function
  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate(values));
    setConsent(!consent);
    setIsSubmit(true);
  };

  // on chang function
  const handelChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: DOMPurify.sanitize(value),
    });
  };

  return {
    values,
    handelChange,
    handleCancel,
    handleSubmit,
    errors,
  };
}

export default useForm;
