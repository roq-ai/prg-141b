import { Box, Center, Flex, Link, List, ListItem, Spinner, Stack, Text } from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import { Error } from 'components/error';
import { FormListItem } from 'components/form-list-item';
import { FormWrapper } from 'components/form-wrapper';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import { routes } from 'routes';
import useSWR from 'swr';
import { compose } from 'lib/compose';
import {
  AccessOperationEnum,
  AccessServiceEnum,
  requireNextAuth,
  useAuthorizationApi,
  withAuthorization,
} from '@roq/nextjs';
import { UserPageTable } from 'components/user-page-table';

import { getCryptoAssetById } from 'apiSdk/crypto-assets';
import { CryptoAssetInterface } from 'interfaces/crypto-asset';
import { StakingListPage } from 'pages/stakings';

function CryptoAssetViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CryptoAssetInterface>(
    () => (id ? `/crypto-assets/${id}` : null),
    () =>
      getCryptoAssetById(id, {
        relations: ['organization'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Crypto Assets',
              link: '/crypto-assets',
            },
            {
              label: 'Crypto Asset Details',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <FormWrapper>
              <Stack direction="column" spacing={2} mb={4}>
                <Text
                  sx={{
                    fontSize: '1.875rem',
                    fontWeight: 700,
                    color: 'base.content',
                  }}
                >
                  Crypto Asset Details
                </Text>
              </Stack>
              <List spacing={3} w="100%">
                <FormListItem label="Name:" text={data?.name} />

                <FormListItem label="Value:" text={data?.value} />

                <FormListItem label="Created At:" text={data?.created_at as unknown as string} />

                <FormListItem label="Updated At:" text={data?.updated_at as unknown as string} />

                {hasAccess('organization', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="Organization:"
                    text={
                      <Link as={NextLink} href={`/organizations/view/${data?.organization?.id}`}>
                        {data?.organization?.name}
                      </Link>
                    }
                  />
                )}
              </List>
            </FormWrapper>

            <Box borderRadius="10px" border="1px" borderColor={'base.300'} mt={4}>
              <StakingListPage
                filters={{ crypto_asset_id: id }}
                hidePagination={true}
                hideTableBorders={true}
                pageSize={5}
                titleProps={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                }}
              />
            </Box>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'crypto_asset',
    operation: AccessOperationEnum.READ,
  }),
)(CryptoAssetViewPage);
