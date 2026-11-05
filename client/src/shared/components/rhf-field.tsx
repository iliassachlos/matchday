import type { ComponentProps } from 'react'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

import { Field, FieldDescription, FieldError, FieldLabel } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'

type RhfFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  description?: string
} & Pick<ComponentProps<'input'>, 'type' | 'autoComplete' | 'placeholder'>

export const RhfField = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  ...inputProps
}: RhfFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <Input
            {...field}
            {...inputProps}
            id={name}
            aria-invalid={fieldState.invalid}
            className="h-11"
          />

          {description && <FieldDescription>{description}</FieldDescription>}

          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  )
}
