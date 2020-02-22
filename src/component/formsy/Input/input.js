import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import { Input, FormGroup, Label, FormFeedback, InputGroup, InputGroupAddon } from 'reactstrap';
import cx from 'classnames';
import { getFormError, resetInputValidation, validateForError } from '../Helper/helper';
import './input.scss';

class FormsyInput extends Component {
  state = {
    isValueInValid: false,
    error: '',
  };

  componentDidMount() {
    const { defaultValue, setValue } = this.props;
    defaultValue && setValue(defaultValue);
  }

  onChange = (event) => {
    const { name, value } = event.currentTarget;
    const { onChange } = this.props;

    this.setState({
      isValueInValid: false,
      error: '',
    });

    resetInputValidation(this.props);
    this.props.setValue(value);
    onChange && onChange(name, value);
  }

  onBlur = (event) => {
    const { name, value } = event.currentTarget;
    const { onBlur } = this.props;
    const error = validateForError(this.props, value);

    if (error) {
      this.setState({
        isValueInValid: true,
        error,
      });
    }

    onBlur && onBlur(name, value);
  }

  renderElement = (isFormError) => {
    const { name, type, placeholder, defaultValue } = this.props;
    const { isValueInValid } = this.state;
    return (
      <Input
        className="form-input"
        invalid={isValueInValid || isFormError}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={this.onChange}
        onBlur={this.onBlur}
        value={ this.props.getValue() || defaultValue || ''}
      />
    );
  }

  render() {
    const { name, label, layout, formValidations, className } = this.props;
    const { error } = this.state;
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
              <Label for={name} className="form-label poppins-font">{label}</Label>
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
          <Label for={name} className="form-label">{label}</Label>
          {element}
          {inputError && <FormFeedback className="form-feedback">{inputError}</FormFeedback>}
        </FormGroup>
      </div>
    );
  }
}

export default withFormsy(FormsyInput);
