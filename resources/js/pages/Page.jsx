import 'bootstrap/dist/css/bootstrap.min.css';

import Welcome from './Welcome';
import Dashboard from './Dashboard';
import Navbar from './Layouts/NavbarMenu';
import Login from './Login';

const pages = {
    Welcome, Dashboard, Login
};

export default function Page({pagename}) {
    const Component = pages[pagename];

    if (!Component) {
        return (
            <>
                <Navbar/>
                <div className='container'>
                    <div className='col-xs-12 mt-3'>
                        <p className='text-muted position-absolute top-0 bottom-0 start-0 end-0' align="center" style={{display:'flex',justifyContent:"center",fontSize:"18pt",alignItems:"center",zIndex:"1000"}}>
                            <b>404</b>&nbsp; | Page Not Found
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return <Component />;
}
