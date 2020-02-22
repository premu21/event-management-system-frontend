import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import { FormGroup, Label, FormFeedback, InputGroup, InputGroupAddon } from 'reactstrap';
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/dist/style.css';
import cx from 'classnames';
import { getFormError, resetInputValidation } from '../Helper/helper';
import './PhoneInput.scss';
class FormsyPhoneInput extends Component {
  state = {
    isValueInValid: false,
    error: '',
  };

  componentDidMount() {
    const { defaultValue } = this.props;
    if(defaultValue) {
      this.setTheValue(defaultValue); 
    }
  }

  setTheValue = (value) => {
      resetInputValidation(this.props);
      this.props.setValue(value);
  }

  onChange = (value) => {
    this.setTheValue(value);
  }

  renderElement = () => {
    const { defaultValue, className } = this.props;

    return (
      <ReactPhoneInput
        inputExtraProps={{
          name: "phone",
          required: true,
          autoFocus: true
        }}
        value={this.props.getValue() || defaultValue || ''}
        autoFormat={true}
        disableAreaCodes={true}
        onChange={this.onChange}
        className={className}
      />
    );
  }

  render() {
    const { name, label, layout, className, formValidations } = this.props;
    const { error } = this.state;
    const formError = getFormError(this.props, formValidations);
    const element = this.renderElement();
    const inputError = error || formError;
    const formClass = cx('form-group', layout, className);

    if (layout === 'elementOnly') {
      return element;
    } else if (layout === 'horizontal') {
      return (
        <FormGroup className={formClass}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Label for={name} className="form-label poppins-font">{label}</Label>
            </InputGroupAddon>
            {element}
            {inputError && <FormFeedback className="form-feedback">{inputError}</FormFeedback>}
          </InputGroup>
        </FormGroup>
      );
    }
    
    return (
      <FormGroup className={formClass}>
        <Label for={name} className="form-label">{label}</Label>
        {element}
        {inputError && <FormFeedback className="form-feedback">{inputError}</FormFeedback>}
      </FormGroup>
    );
  }
}

export default withFormsy(FormsyPhoneInput);
