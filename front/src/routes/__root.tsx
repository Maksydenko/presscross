import { TanstackDevtools } from '@tanstack/react-devtools';
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import { Pathname, Phase } from '@/shared/config';

export const Route = createRootRoute({
  beforeLoad: ({ location: { pathname, searchStr } }) => {
    if (pathname === Pathname.Home && !searchStr) {
      return;
    }

    throw redirect({
      search: {},
      to: Pathname.Home as string
    });
  },
  component: () => (
    <>
      <Outlet />
      {import.meta.env.VITE_PHASE === Phase.Development && (
        <TanstackDevtools
          config={{
            position: 'bottom-right'
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />
            }
          ]}
        />
      )}
    </>
  )
});
