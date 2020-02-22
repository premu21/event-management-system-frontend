import React, { Component } from 'react';
import Formsy from 'formsy-react';
import _ from 'lodash';
import Validator from '../../constants/validator';
import './Form.scss';

class FormsyForm extends Component {
  onSubmit = (model) => {
    const { onSubmit, validations = {} } = this.props;
    const isFormValid = Object.keys(validations).every((key) => {
      const validation = validations[key];
      const value = model[key];
      return validation.every((validationRule) => {
        const rule = Validator[validationRule.validator];
        const isValid = rule(value);
        if (!isValid) {
          validationRule.error = true;
        }
        return isValid;
      });
    });

    if (isFormValid) {
      onSubmit && onSubmit(model);
    }
    return;
  }

  render() {
    const { children, onValid, onInvalid } = this.props;
    return (
      <Formsy onValid={onValid} onInvalid={onInvalid} onSubmit={this.onSubmit}>
        {children}
      </Formsy>
    );
  }
}

export default FormsyForm;
