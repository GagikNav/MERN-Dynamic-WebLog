import { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

function useForm(
  submit,
  validate,
  article,
  consent,
  setConsent,
  changeEditMode,
) {
  const [initialFormValues, setInitialFormValues] = useState({});
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [imgIndex, setImgIndex] = useState(11);
  // test wether submitted
  const [isSubmit, setIsSubmit] = useState(false);

  //  this ref is used for save consent popup
  const isCalled = useRef(false);

  //  defining if edit mode and what to do
  function init() {
    if (article) {
      setValues({
        name: article.name,
        postTitle: article.postTitle,
        postBody: article.postBody,
      });
      // isEdit is function when in editing mode
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

  //
  

  // this will run if user press save and there is no errors
  useEffect( async () => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log('submitted successfully');
      await submit(isEdit);
      setIsEdit(false);
    } else {
      // need this to called second time for save function
      if (Object.keys(errors).length === 0 && isCalled.current) {
        setConsent(true);
      }
    }
    isCalled.current = true;
  }, [errors]);

  //
  useEffect(() => {
    init();
    setImgIndex(Math.floor(Math.random() * 1000));
  }, []);

  //

  // Cancel function
  const handleCancel = e => {
    e.preventDefault();
    setErrors({
      name: '',
      postTitle: '',
      postBody: '',
    });
    setValues(initialFormValues);
    setIsSubmit(false);
  };

  // save function
  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate(values));
    setConsent(false);
    setIsSubmit(true);
  };

  //  Setting first save
  const handleSave = e => {
    e.preventDefault();
    setErrors(validate(values));
  };

  // on chang function
  const handelChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: DOMPurify.sanitize(value),
      imgIndex: imgIndex * 1,
    });
  };

  return {
    values,
    handelChange,
    handleCancel,
    handleSubmit,
    errors,
    handleSave,
  };
}

export default useForm;
