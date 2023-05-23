import { Group, Stack } from '@mantine/core';
import { useEffect } from 'react';

import styled from '@emotion/styled';
import { Button, colors, Text } from '../../../design-system';
import { Label } from '../../../design-system/typography/label';
import { When } from '../../../components/utils/When';

export function SetupStatus({
  appInitialized,
  onDone,
  onConfigureLater,
}: {
  appInitialized: boolean;
  onDone: () => void;
  onConfigureLater?: () => void;
}) {
  function handleConfigureLater() {
    if (!onConfigureLater) {
      return;
    }
    onConfigureLater();
  }

  useEffect(() => {
    let timer;
    if (appInitialized) {
      timer = setTimeout(() => {
        onDone();
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [appInitialized]);

  return (
    <Stack>
      <Stack spacing={8}>
        <TextStyled>As soon as you run your application, it will send us a request to connect.</TextStyled>
        <TextStyled>
          Status: <Label color="blue">{appInitialized ? 'Connecting' : 'Pending'}...</Label>
        </TextStyled>
      </Stack>

      <When truthy={onConfigureLater !== undefined}>
        <Group spacing={128}>
          <Stack spacing={8}>
            <TextStyled>Don't want to configure the In-App center now?</TextStyled>
            <TextStyled>Configure it later in a notification workflow builder.</TextStyled>
          </Stack>
          <Button variant="outline" onClick={handleConfigureLater}>
            Configure Later
          </Button>
        </Group>
      </When>
    </Stack>
  );
}

const TextStyled = styled(Text)`
  color: ${({ theme }) => (theme.colorScheme === 'dark' ? colors.B80 : colors.B60)};
  display: flex;
  align-items: center;
  gap: 5px;
`;
