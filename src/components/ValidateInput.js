const validate = values => {
  let errors = {};
  let { name, postBody, postTitle, imgIndex } = values;
  // name
  // $name should not be empty
  // $name should be morea than three characters
  // $ name should be less than 10 characters
  if (name.length === 0) {
    errors.name = 'Name is required';
  } else if (name.length > 0 && name.length < 3) {
    errors.name = 'Name should be more than 3 characters';
  } else if (name.length > 10) {
    errors.name = 'Name should be less than 10 characters';
  }
  // title
  // $more than 5 characters
  // $less than 50
  if (postTitle.length === 0) {
    errors.postTitle = 'Title is required';
  } else if (postTitle.length > 0 && postTitle.length < 10) {
    errors.postTitle = 'Title should be more than 10 characters';
  } else if (postTitle.length > 50) {
    errors.postTitle = 'Title should be less than 50 characters';
  }
  // Body
  // $more than 10 characters
  // $less than 1000
  if (postBody.length === 0) {
    errors.postBody = 'Markdown is required';
  } else if (postBody.length > 0 && postBody.length < 20) {
    errors.postBody = 'Markdown should be more than 50 characters';
  } else if (postBody.length > 1000) {
    errors.postBody = 'Markdown should be less than 1000 characters';
  }
  // image index
  // $only number

  return errors;
};

export default validate;
