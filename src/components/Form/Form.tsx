'use client';

import React, { useMemo, useState } from 'react';

import { FormFields, FormInstrumentContent, FormInstrumentData } from '@douglasneuroinformatics/common';
import { JSONSchemaType } from 'ajv';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

import { FormProvider } from '../../context/FormContext';
import { ajv } from '../../services/ajv';
import { withI18nProvider } from '../../utils/with-i18n-provider';
import { Button } from '../Button';

import { ArrayField, ArrayFieldProps } from './ArrayField';
import { PrimitiveFormField, PrimitiveFormFieldProps } from './PrimitiveFormField';
import { FormErrors, FormValues, NullableArrayFieldValue, NullablePrimitiveFieldValue } from './types';
import { getDefaultValues, getFormErrors } from './utils';

interface FormProps<T extends FormInstrumentData> {
  content: FormInstrumentContent<T>;
  className?: string;
  initialValues?: FormValues<T> | null;
  resetBtn?: boolean;
  submitBtnLabel?: string;
  validationSchema: JSONSchemaType<T> & {
    errorMessage?: {
      [key: string]: any;
    };
  };
  onSubmit: (data: T) => void;
}

const FormComponent = <T extends FormInstrumentData>({
  content,
  className,
  initialValues,
  submitBtnLabel,
  validationSchema,
  onSubmit,
  resetBtn
}: FormProps<T>) => {
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [values, setValues] = useState<FormValues<T>>(() => initialValues ?? getDefaultValues(content));

  const { t } = useTranslation();

  const reset = () => {
    setValues(getDefaultValues(content));
    setErrors({});
  };
  const validate = useMemo(() => ajv.compile(validationSchema), [validationSchema]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const valid = validate(values);
    if (valid) {
      reset();
      onSubmit(values as T);
    } else {
      console.error(validate.errors);
      setErrors(getFormErrors(validate.errors));
    }
  };

  const renderFormFields = (fields: FormFields<T>): JSX.Element[] => {
    const formFields: JSX.Element[] = [];
    for (const fieldName in fields) {
      const props = {
        name: fieldName,
        error: errors[fieldName],
        value: values[fieldName],
        setValue: (value: NullablePrimitiveFieldValue | NullableArrayFieldValue) => {
          setValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
        },
        ...fields[fieldName]
      };
      if (props.kind === 'array') {
        formFields.push(<ArrayField key={fieldName} {...(props as ArrayFieldProps)} />);
      } else {
        formFields.push(<PrimitiveFormField key={fieldName} {...(props as PrimitiveFormFieldProps)} />);
      }
    }
    return formFields;
  };

  return (
    <FormProvider {...{ errors, setErrors, values, setValues }}>
      <form autoComplete="off" className={clsx('w-full', className)} onSubmit={handleSubmit}>
        {Array.isArray(content)
          ? content.map((fieldGroup, i) => {
              return (
                <div key={i}>
                  <div className="mb-5">
                    <h3 className="mb-2 font-semibold">{fieldGroup.title}</h3>
                    {fieldGroup.description && (
                      <small className="text-sm italic text-slate-600 dark:text-slate-300">
                        {fieldGroup.description}
                      </small>
                    )}
                  </div>
                  {renderFormFields(fieldGroup.fields as FormFields<T>)}
                </div>
              );
            })
          : renderFormFields(content)}
        <div className="flex w-full gap-3">
          <Button
            className="block w-full first-letter:capitalize"
            label={submitBtnLabel ?? t('form.submit')}
            type="submit"
            variant="primary"
          />
          {resetBtn && (
            <Button
              className="block w-full first-letter:capitalize"
              label={t('form.reset')}
              type="button"
              variant="secondary"
              onClick={reset}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};

const Form = withI18nProvider(FormComponent) as typeof FormComponent;

export { Form, type FormProps };
