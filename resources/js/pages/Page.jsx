import 'bootstrap/dist/css/bootstrap.min.css';

import Welcome from './Welcome';
import Dashboard from './Dashboard';

const pages = {
    Welcome, Dashboard
};

export default function Page({pagename}) {
    const Component = pages[pagename];

    if (!Component) {
        return <h1>404 - Page Not Found</h1>;
    }

    return <Component />;
}
