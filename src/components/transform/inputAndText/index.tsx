import React from 'react';

import { TInputProps } from 'components/input/input.styled';
import { TTypographyProps } from 'components/typography/typography.styled';
import TInput from 'components/input';
import TTypography from 'components/typography';
import TBox from 'components/box';
import { TBoxProps } from 'components/box/box.styled';
import TGrid from 'components/grid';

export type TInputTransformTextCurrentType = 'input' | 'text';

export type TInputTransformText = TInputProps & {
  typographyProps?: TTypographyProps;
  currentType?: TInputTransformTextCurrentType;
  containerProps?: TBoxProps;
};

const TInputTransformText = ({
  currentType,
  label,
  value,
  typographyProps,
  containerProps,
  ...props
}: TInputTransformText) => {
  return (
    <TBox {...containerProps}>
      {currentType === 'text' && (
          <TGrid container alignItems="center"  minHeight={40}>
            <TGrid item sm={3} xs={12}>
              <TTypography {...typographyProps}>
                {label}:{' '}
              </TTypography>
            </TGrid>
            <TGrid item sm={9} xs={12}>
              <TTypography {...typographyProps} overflowWrap="break-word">
                {value as string}
              </TTypography>
            </TGrid>
          </TGrid>
      )}
      {currentType === 'input' && <TInput value={value} label={label} {...props} />}
    </TBox>
  );
};

export default TInputTransformText;
