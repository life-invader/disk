import type { UseFormReturn, FieldValues, Path } from 'react-hook-form';

export const applyServerErrors = <T extends FieldValues>(
  methods: UseFormReturn<T>,
  fieldErrors?: Partial<T>
) => {
  if (!fieldErrors) {
    return;
  }

  Object.entries(fieldErrors).forEach(([field, message]) => {
    methods.setError(field as Path<T>, {
      type: 'server',
      message,
    });
  });
};
