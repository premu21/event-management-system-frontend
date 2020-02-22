import { 
  withFormsy 
} from 'formsy-react';
import React, { 
  Component 
} from 'react';
import _ from 'lodash';
import {
  CustomInput,
  FormGroup,
  Label,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import cx from 'classnames';
import { 
  getFormError, 
  resetInputValidation 
} from '../Helper/helper';
import './FileInput.scss';
const maxSize = 5*1000*1000;

class FormsyFileInput extends Component {
  state = {
    isValueInValid: false,
    error: '',
    fileName: ''
  };

  handleFileChange = ({target: {files}}) => {
    const cancel = !files.length;
    const [{ 
      size, 
      name 
    }] = files;
    if (cancel) {
      return;
    }
    if (size < maxSize) {
      resetInputValidation(this.props);
      this.props.setValue(files[0]);
      this.setState({ 
        fileName: name, 
        invalidFile: false 
      });
    } else {
      this.setState({ 
        fileName: '', 
        invalidFile: true 
      });
    }
  }

  renderElement = (isFormError) => {
    const { name } = this.props;
    const { 
      isValueInValid, 
      fileName 
    } = this.state;

    return (
      <CustomInput
        type="file"
        name={name}
        label={fileName || 'Choose your Resume File'}
        onChange={this.handleFileChange}
        invalid={isValueInValid || isFormError}
      />
    );
  }

  render() {
    const { 
      name, 
      label, 
      layout, 
      formValidations, 
      className 
    } = this.props;
    const { 
      error 
    } = this.state;
    const formError = getFormError(this.props, formValidations);
    const element = this.renderElement(!!formError);
    const inputError = error || formError;
    const formClass = cx('form-group', layout, className);

    if (layout === 'elementOnly') {
      return element;
    } else if (layout === 'horizontal') {
      return (
        <FormGroup className={formClass}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Label for={name} className="form-label poppins-font">
                {label}
              </Label>
            </InputGroupAddon>
            {element}
            {inputError && <FormFeedback className="form-feedback">{inputError}</FormFeedback>}
          </InputGroup>
        </FormGroup>
      );
    }

    return (
      <div>
        <FormGroup className={formClass}>
          <Label for={name} className="form-label">
            {label}
          </Label>
          {element}
          {inputError && <FormFeedback className="form-feedback">{inputError}</FormFeedback>}
        </FormGroup>
      </div>
    );
  }
}

export default withFormsy(FormsyFileInput);
