'use client';

import React, { useMemo, useState } from 'react';

import {
  ArrayFieldValue,
  FormFields,
  FormInstrumentContent,
  FormInstrumentData,
  PrimitiveFieldValue
} from '@douglasneuroinformatics/common';
import { ErrorObject, JSONSchemaType } from 'ajv';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

import { FormProvider } from '../../context/FormContext';
import { ajv } from '../../services/ajv';
import { withI18nProvider } from '../../utils/with-i18n-provider';
import { Button } from '../Button';

import { ArrayField, ArrayFieldProps } from './ArrayField';
import { PrimitiveFormField, PrimitiveFormFieldProps } from './PrimitiveFormField';
import { FormErrors, FormValues, NullableArrayFieldValue, NullablePrimitiveFieldValue } from './types';
import { getDefaultValues } from './utils';

/** Custom error messages to be supplied for each field */
type ErrorMessages<T extends FormInstrumentData> = {
  [K in keyof T]?: T[K] extends PrimitiveFieldValue
    ? string
    : T[K] extends ArrayFieldValue
    ? {
        [P in keyof T[K][number]]?: string;
      }
    : never;
};

interface FormProps<T extends FormInstrumentData> {
  content: FormInstrumentContent<T>;
  className?: string;
  initialValues?: FormValues<T> | null;
  resetBtn?: boolean;
  submitBtnLabel?: string;
  errorMessages?: string | ErrorMessages<T>;
  validationSchema: JSONSchemaType<T>;
  onSubmit: (data: T) => void;
}

const FormComponent = <T extends FormInstrumentData>({
  content,
  className,
  initialValues,
  errorMessages,
  submitBtnLabel,
  validationSchema,
  onSubmit,
  resetBtn
}: FormProps<T>) => {
  const [validationErrors, setValidationErrors] = useState<ErrorObject[] | null>(null);
  const [values, setValues] = useState<FormValues<T>>(() => initialValues ?? getDefaultValues(content));

  const { t, i18n } = useTranslation();

  const errors: FormErrors<T> = useMemo(() => {
    const formErrors: FormErrors<T> = {};
    if (!validationErrors) {
      return formErrors;
    }

    const getErrorMessage = (error: ErrorObject, path: string[]): string => {
      const defaultMessage = `${error.message ?? t('form.errors.unknown')}`;
      const [k1, k2]: [string?, string?] = [path[0], path[2]];
      if (typeof errorMessages === 'string') {
        return errorMessages;
      } else if (typeof errorMessages?.[k1] === 'string') {
        return errorMessages[k1] as string;
      } else if (errorMessages?.[k1] instanceof Object) {
        return (errorMessages[k1] as Record<string, string | undefined>)[k2] ?? defaultMessage;
      }
      return defaultMessage;
    };

    for (const error of validationErrors) {
      const path = error.instancePath.split('/').filter((e) => e);
      const baseField = path[0] as Extract<keyof T, string>;
      const isPrimitiveField = path.length === 1;
      if (isPrimitiveField) {
        (formErrors[baseField] as string) = getErrorMessage(error, path);
        continue;
      }
      if (!Array.isArray(formErrors[baseField])) {
        (formErrors[baseField] as Record<string, string>[]) = [];
      }
      const arrayErrors = formErrors[baseField] as Record<string, string>[];
      const [index, item] = [parseInt(path[1]), path[2]];
      if (!arrayErrors[index]) {
        arrayErrors[index] = {};
      }
      arrayErrors[index][item] = getErrorMessage(error, path);
    }
    return formErrors;
  }, [validationErrors, i18n.resolvedLanguage]);

  const reset = () => {
    setValues(getDefaultValues(content));
    setValidationErrors(null);
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
      setValidationErrors(validate.errors ?? null)
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
    <FormProvider {...{ errors, values, setValues }}>
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
