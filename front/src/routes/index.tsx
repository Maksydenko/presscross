import { createFileRoute } from '@tanstack/react-router';

import Home from '@/pages/home';

const App = () => <Home />;

export const Route = createFileRoute('/')({
  component: App
});
