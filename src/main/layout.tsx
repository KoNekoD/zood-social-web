import {Outlet} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {Toaster} from 'react-hot-toast';
import {Sidebar} from './sidebar';

export const Layout = observer(() => {
  return (
      <div className="h-full grid grid-cols-12 bg-gray-300">
          <Toaster/>
          <div className="">
              <div className="fixed px-4 py-2 h-screen bg-gray-300">
                  <Sidebar/>
              </div>
          </div>
          <div className="w-full h-screen px-8 col-start-2 col-end-13">
              <Outlet/>
          </div>
      </div>
  );
});
